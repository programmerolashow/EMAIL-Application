/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/server/db';
import { env } from '@/env';
import type { UserJSON, WebhookEvent } from '@clerk/nextjs/server';

export const POST = async (request: Request) => {
  try {
    // ✅ 1. Get headers (NOT async in Next.js App Router)
    const headersList = await headers();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Missing svix headers', { status: 400 });
    }

    // ✅ 2. Read request body
    const body = await request.text();

    // ✅ 3. Get webhook secret (validated env)
    const secret = env.CLERK_WEBHOOK_SECRET;
    if (!secret) throw new Error('Missing CLERK_WEBHOOK_SECRET');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const wh = new Webhook(secret);

    // ✅ 4. Verify webhook FIRST (this gives evt)
    let evt: WebhookEvent;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return new Response('Webhook verification failed', { status: 400 });
    }

    // ✅ 5. Extract after verification (NOW evt is defined)
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Received webhook with ID ${id} and type ${eventType}`);

    // ✅ 6. Handle events
    switch (eventType) {
      case 'user.created':
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        await handleUserCreated(evt.data as UserJSON);
        break;

      case 'user.updated':
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        await handleUserUpdated(evt.data as UserJSON);
        break;

      case 'user.deleted':
        await handleUserDeleted(evt.data as unknown as UserJSON);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

// =========================
// DB HANDLERS
// =========================

async function handleUserCreated(user: UserJSON) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await db.user.create({
    data: {
      id: user.id,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      firstname: user.first_name || '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      lastname: user.last_name || '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      email: user.email_addresses?.[0]?.email_address || '',
      time: new Date(),
      imageURL: user.image_url || '',
    },
  });
}

async function handleUserUpdated(user: UserJSON) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await db.user.update({
    where: { id: user.id },
    data: {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      firstname: user.first_name || '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      lastname: user.last_name || '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      email: user.email_addresses?.[0]?.email_address || '',
      time: new Date(),
      imageURL: user.image_url || '',
    },
  });
}

async function handleUserDeleted(user: UserJSON) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await db.user.delete({
    where: { id: user.id },
  });
}