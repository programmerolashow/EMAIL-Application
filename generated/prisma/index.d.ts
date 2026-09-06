
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Thread
 * 
 */
export type Thread = $Result.DefaultSelection<Prisma.$ThreadPayload>
/**
 * Model Email
 * 
 */
export type Email = $Result.DefaultSelection<Prisma.$EmailPayload>
/**
 * Model EmailAddress
 * 
 */
export type EmailAddress = $Result.DefaultSelection<Prisma.$EmailAddressPayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model Draft
 * 
 */
export type Draft = $Result.DefaultSelection<Prisma.$DraftPayload>
/**
 * Model WebhookEvent
 * 
 */
export type WebhookEvent = $Result.DefaultSelection<Prisma.$WebhookEventPayload>
/**
 * Model AIAnalysis
 * 
 */
export type AIAnalysis = $Result.DefaultSelection<Prisma.$AIAnalysisPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.thread`: Exposes CRUD operations for the **Thread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Threads
    * const threads = await prisma.thread.findMany()
    * ```
    */
  get thread(): Prisma.ThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.email`: Exposes CRUD operations for the **Email** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emails
    * const emails = await prisma.email.findMany()
    * ```
    */
  get email(): Prisma.EmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailAddress`: Exposes CRUD operations for the **EmailAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailAddresses
    * const emailAddresses = await prisma.emailAddress.findMany()
    * ```
    */
  get emailAddress(): Prisma.EmailAddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.draft`: Exposes CRUD operations for the **Draft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drafts
    * const drafts = await prisma.draft.findMany()
    * ```
    */
  get draft(): Prisma.DraftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEvents
    * const webhookEvents = await prisma.webhookEvent.findMany()
    * ```
    */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIAnalysis`: Exposes CRUD operations for the **AIAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAnalyses
    * const aIAnalyses = await prisma.aIAnalysis.findMany()
    * ```
    */
  get aIAnalysis(): Prisma.AIAnalysisDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Thread: 'Thread',
    Email: 'Email',
    EmailAddress: 'EmailAddress',
    Attachment: 'Attachment',
    Draft: 'Draft',
    WebhookEvent: 'WebhookEvent',
    AIAnalysis: 'AIAnalysis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "thread" | "email" | "emailAddress" | "attachment" | "draft" | "webhookEvent" | "aIAnalysis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Thread: {
        payload: Prisma.$ThreadPayload<ExtArgs>
        fields: Prisma.ThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findFirst: {
            args: Prisma.ThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findMany: {
            args: Prisma.ThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          create: {
            args: Prisma.ThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          createMany: {
            args: Prisma.ThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          delete: {
            args: Prisma.ThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          update: {
            args: Prisma.ThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          deleteMany: {
            args: Prisma.ThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          upsert: {
            args: Prisma.ThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          aggregate: {
            args: Prisma.ThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThread>
          }
          groupBy: {
            args: Prisma.ThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThreadCountArgs<ExtArgs>
            result: $Utils.Optional<ThreadCountAggregateOutputType> | number
          }
        }
      }
      Email: {
        payload: Prisma.$EmailPayload<ExtArgs>
        fields: Prisma.EmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findFirst: {
            args: Prisma.EmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findMany: {
            args: Prisma.EmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          create: {
            args: Prisma.EmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          createMany: {
            args: Prisma.EmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          delete: {
            args: Prisma.EmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          update: {
            args: Prisma.EmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          deleteMany: {
            args: Prisma.EmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          upsert: {
            args: Prisma.EmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          aggregate: {
            args: Prisma.EmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmail>
          }
          groupBy: {
            args: Prisma.EmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailCountArgs<ExtArgs>
            result: $Utils.Optional<EmailCountAggregateOutputType> | number
          }
        }
      }
      EmailAddress: {
        payload: Prisma.$EmailAddressPayload<ExtArgs>
        fields: Prisma.EmailAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          findFirst: {
            args: Prisma.EmailAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          findMany: {
            args: Prisma.EmailAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>[]
          }
          create: {
            args: Prisma.EmailAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          createMany: {
            args: Prisma.EmailAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailAddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>[]
          }
          delete: {
            args: Prisma.EmailAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          update: {
            args: Prisma.EmailAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          deleteMany: {
            args: Prisma.EmailAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailAddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>[]
          }
          upsert: {
            args: Prisma.EmailAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailAddressPayload>
          }
          aggregate: {
            args: Prisma.EmailAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailAddress>
          }
          groupBy: {
            args: Prisma.EmailAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailAddressCountArgs<ExtArgs>
            result: $Utils.Optional<EmailAddressCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      Draft: {
        payload: Prisma.$DraftPayload<ExtArgs>
        fields: Prisma.DraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          findFirst: {
            args: Prisma.DraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          findMany: {
            args: Prisma.DraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>[]
          }
          create: {
            args: Prisma.DraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          createMany: {
            args: Prisma.DraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>[]
          }
          delete: {
            args: Prisma.DraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          update: {
            args: Prisma.DraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          deleteMany: {
            args: Prisma.DraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DraftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>[]
          }
          upsert: {
            args: Prisma.DraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DraftPayload>
          }
          aggregate: {
            args: Prisma.DraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDraft>
          }
          groupBy: {
            args: Prisma.DraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<DraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.DraftCountArgs<ExtArgs>
            result: $Utils.Optional<DraftCountAggregateOutputType> | number
          }
        }
      }
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>
        fields: Prisma.WebhookEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEvent>
          }
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventCountAggregateOutputType> | number
          }
        }
      }
      AIAnalysis: {
        payload: Prisma.$AIAnalysisPayload<ExtArgs>
        fields: Prisma.AIAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findFirst: {
            args: Prisma.AIAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findMany: {
            args: Prisma.AIAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          create: {
            args: Prisma.AIAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          createMany: {
            args: Prisma.AIAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          delete: {
            args: Prisma.AIAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          update: {
            args: Prisma.AIAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AIAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AIAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          aggregate: {
            args: Prisma.AIAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAnalysis>
          }
          groupBy: {
            args: Prisma.AIAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    thread?: ThreadOmit
    email?: EmailOmit
    emailAddress?: EmailAddressOmit
    attachment?: AttachmentOmit
    draft?: DraftOmit
    webhookEvent?: WebhookEventOmit
    aIAnalysis?: AIAnalysisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    threads: number
    emails: number
    drafts: number
    emailAddresses: number
    aiAnalyses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    threads?: boolean | UserCountOutputTypeCountThreadsArgs
    emails?: boolean | UserCountOutputTypeCountEmailsArgs
    drafts?: boolean | UserCountOutputTypeCountDraftsArgs
    emailAddresses?: boolean | UserCountOutputTypeCountEmailAddressesArgs
    aiAnalyses?: boolean | UserCountOutputTypeCountAiAnalysesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDraftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DraftWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailAddressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    threads: number
    emails: number
    drafts: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    threads?: boolean | AccountCountOutputTypeCountThreadsArgs
    emails?: boolean | AccountCountOutputTypeCountEmailsArgs
    drafts?: boolean | AccountCountOutputTypeCountDraftsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountDraftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DraftWhereInput
  }


  /**
   * Count Type ThreadCountOutputType
   */

  export type ThreadCountOutputType = {
    emails: number
    drafts: number
    aiAnalyses: number
  }

  export type ThreadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | ThreadCountOutputTypeCountEmailsArgs
    drafts?: boolean | ThreadCountOutputTypeCountDraftsArgs
    aiAnalyses?: boolean | ThreadCountOutputTypeCountAiAnalysesArgs
  }

  // Custom InputTypes
  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadCountOutputType
     */
    select?: ThreadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }

  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeCountDraftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DraftWhereInput
  }

  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeCountAiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
  }


  /**
   * Count Type EmailCountOutputType
   */

  export type EmailCountOutputType = {
    attachments: number
    aiAnalyses: number
  }

  export type EmailCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | EmailCountOutputTypeCountAttachmentsArgs
    aiAnalyses?: boolean | EmailCountOutputTypeCountAiAnalysesArgs
  }

  // Custom InputTypes
  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCountOutputType
     */
    select?: EmailCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountAiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    time: Date | null
    email: string | null
    imageURL: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    time: Date | null
    email: string | null
    imageURL: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstname: number
    lastname: number
    time: number
    email: number
    imageURL: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    time?: true
    email?: true
    imageURL?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    time?: true
    email?: true
    imageURL?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    time?: true
    email?: true
    imageURL?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstname: string
    lastname: string
    time: Date
    email: string
    imageURL: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    time?: boolean
    email?: boolean
    imageURL?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    threads?: boolean | User$threadsArgs<ExtArgs>
    emails?: boolean | User$emailsArgs<ExtArgs>
    drafts?: boolean | User$draftsArgs<ExtArgs>
    emailAddresses?: boolean | User$emailAddressesArgs<ExtArgs>
    aiAnalyses?: boolean | User$aiAnalysesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    time?: boolean
    email?: boolean
    imageURL?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    time?: boolean
    email?: boolean
    imageURL?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    time?: boolean
    email?: boolean
    imageURL?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstname" | "lastname" | "time" | "email" | "imageURL", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    threads?: boolean | User$threadsArgs<ExtArgs>
    emails?: boolean | User$emailsArgs<ExtArgs>
    drafts?: boolean | User$draftsArgs<ExtArgs>
    emailAddresses?: boolean | User$emailAddressesArgs<ExtArgs>
    aiAnalyses?: boolean | User$aiAnalysesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      threads: Prisma.$ThreadPayload<ExtArgs>[]
      emails: Prisma.$EmailPayload<ExtArgs>[]
      drafts: Prisma.$DraftPayload<ExtArgs>[]
      emailAddresses: Prisma.$EmailAddressPayload<ExtArgs>[]
      aiAnalyses: Prisma.$AIAnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstname: string
      lastname: string
      time: Date
      email: string
      imageURL: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    threads<T extends User$threadsArgs<ExtArgs> = {}>(args?: Subset<T, User$threadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emails<T extends User$emailsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    drafts<T extends User$draftsArgs<ExtArgs> = {}>(args?: Subset<T, User$draftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emailAddresses<T extends User$emailAddressesArgs<ExtArgs> = {}>(args?: Subset<T, User$emailAddressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiAnalyses<T extends User$aiAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, User$aiAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly time: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly imageURL: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.threads
   */
  export type User$threadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    cursor?: ThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * User.emails
   */
  export type User$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * User.drafts
   */
  export type User$draftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    where?: DraftWhereInput
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    cursor?: DraftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * User.emailAddresses
   */
  export type User$emailAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    where?: EmailAddressWhereInput
    orderBy?: EmailAddressOrderByWithRelationInput | EmailAddressOrderByWithRelationInput[]
    cursor?: EmailAddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailAddressScalarFieldEnum | EmailAddressScalarFieldEnum[]
  }

  /**
   * User.aiAnalyses
   */
  export type User$aiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    cursor?: AIAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    email: string | null
    name: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    email: string | null
    name: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerAccountId: number
    email: number
    name: number
    accessToken: number
    refreshToken: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    email?: true
    name?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    email?: true
    name?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerAccountId?: true
    email?: true
    name?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    provider: string | null
    providerAccountId: string | null
    email: string
    name: string
    accessToken: string
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    name?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    threads?: boolean | Account$threadsArgs<ExtArgs>
    emails?: boolean | Account$emailsArgs<ExtArgs>
    drafts?: boolean | Account$draftsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    name?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    name?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    name?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerAccountId" | "email" | "name" | "accessToken" | "refreshToken" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    threads?: boolean | Account$threadsArgs<ExtArgs>
    emails?: boolean | Account$emailsArgs<ExtArgs>
    drafts?: boolean | Account$draftsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      threads: Prisma.$ThreadPayload<ExtArgs>[]
      emails: Prisma.$EmailPayload<ExtArgs>[]
      drafts: Prisma.$DraftPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string | null
      providerAccountId: string | null
      email: string
      name: string
      accessToken: string
      refreshToken: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    threads<T extends Account$threadsArgs<ExtArgs> = {}>(args?: Subset<T, Account$threadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emails<T extends Account$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Account$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    drafts<T extends Account$draftsArgs<ExtArgs> = {}>(args?: Subset<T, Account$draftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly email: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly expiresAt: FieldRef<"Account", 'DateTime'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.threads
   */
  export type Account$threadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    cursor?: ThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Account.emails
   */
  export type Account$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Account.drafts
   */
  export type Account$draftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    where?: DraftWhereInput
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    cursor?: DraftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Thread
   */

  export type AggregateThread = {
    _count: ThreadCountAggregateOutputType | null
    _avg: ThreadAvgAggregateOutputType | null
    _sum: ThreadSumAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  export type ThreadAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type ThreadSumAggregateOutputType = {
    messageCount: number | null
  }

  export type ThreadMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    subject: string | null
    lastMessageDate: Date | null
    snippet: string | null
    unread: boolean | null
    folder: string | null
    messageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThreadMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    subject: string | null
    lastMessageDate: Date | null
    snippet: string | null
    unread: boolean | null
    folder: string | null
    messageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThreadCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    subject: number
    lastMessageDate: number
    snippet: number
    unread: number
    folder: number
    messageCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ThreadAvgAggregateInputType = {
    messageCount?: true
  }

  export type ThreadSumAggregateInputType = {
    messageCount?: true
  }

  export type ThreadMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    subject?: true
    lastMessageDate?: true
    snippet?: true
    unread?: true
    folder?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThreadMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    subject?: true
    lastMessageDate?: true
    snippet?: true
    unread?: true
    folder?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThreadCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    subject?: true
    lastMessageDate?: true
    snippet?: true
    unread?: true
    folder?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Thread to aggregate.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Threads
    **/
    _count?: true | ThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ThreadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ThreadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThreadMaxAggregateInputType
  }

  export type GetThreadAggregateType<T extends ThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThread[P]>
      : GetScalarType<T[P], AggregateThread[P]>
  }




  export type ThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithAggregationInput | ThreadOrderByWithAggregationInput[]
    by: ThreadScalarFieldEnum[] | ThreadScalarFieldEnum
    having?: ThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThreadCountAggregateInputType | true
    _avg?: ThreadAvgAggregateInputType
    _sum?: ThreadSumAggregateInputType
    _min?: ThreadMinAggregateInputType
    _max?: ThreadMaxAggregateInputType
  }

  export type ThreadGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    subject: string | null
    lastMessageDate: Date | null
    snippet: string | null
    unread: boolean
    folder: string | null
    messageCount: number
    createdAt: Date
    updatedAt: Date
    _count: ThreadCountAggregateOutputType | null
    _avg: ThreadAvgAggregateOutputType | null
    _sum: ThreadSumAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  type GetThreadGroupByPayload<T extends ThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThreadGroupByOutputType[P]>
            : GetScalarType<T[P], ThreadGroupByOutputType[P]>
        }
      >
    >


  export type ThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    lastMessageDate?: boolean
    snippet?: boolean
    unread?: boolean
    folder?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    emails?: boolean | Thread$emailsArgs<ExtArgs>
    drafts?: boolean | Thread$draftsArgs<ExtArgs>
    aiAnalyses?: boolean | Thread$aiAnalysesArgs<ExtArgs>
    _count?: boolean | ThreadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    lastMessageDate?: boolean
    snippet?: boolean
    unread?: boolean
    folder?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    lastMessageDate?: boolean
    snippet?: boolean
    unread?: boolean
    folder?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    lastMessageDate?: boolean
    snippet?: boolean
    unread?: boolean
    folder?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountId" | "subject" | "lastMessageDate" | "snippet" | "unread" | "folder" | "messageCount" | "createdAt" | "updatedAt", ExtArgs["result"]["thread"]>
  export type ThreadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    emails?: boolean | Thread$emailsArgs<ExtArgs>
    drafts?: boolean | Thread$draftsArgs<ExtArgs>
    aiAnalyses?: boolean | Thread$aiAnalysesArgs<ExtArgs>
    _count?: boolean | ThreadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ThreadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type ThreadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $ThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Thread"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
      emails: Prisma.$EmailPayload<ExtArgs>[]
      drafts: Prisma.$DraftPayload<ExtArgs>[]
      aiAnalyses: Prisma.$AIAnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      subject: string | null
      lastMessageDate: Date | null
      snippet: string | null
      unread: boolean
      folder: string | null
      messageCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["thread"]>
    composites: {}
  }

  type ThreadGetPayload<S extends boolean | null | undefined | ThreadDefaultArgs> = $Result.GetResult<Prisma.$ThreadPayload, S>

  type ThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThreadCountAggregateInputType | true
    }

  export interface ThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Thread'], meta: { name: 'Thread' } }
    /**
     * Find zero or one Thread that matches the filter.
     * @param {ThreadFindUniqueArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThreadFindUniqueArgs>(args: SelectSubset<T, ThreadFindUniqueArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Thread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThreadFindUniqueOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, ThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThreadFindFirstArgs>(args?: SelectSubset<T, ThreadFindFirstArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, ThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Threads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Threads
     * const threads = await prisma.thread.findMany()
     * 
     * // Get first 10 Threads
     * const threads = await prisma.thread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const threadWithIdOnly = await prisma.thread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThreadFindManyArgs>(args?: SelectSubset<T, ThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Thread.
     * @param {ThreadCreateArgs} args - Arguments to create a Thread.
     * @example
     * // Create one Thread
     * const Thread = await prisma.thread.create({
     *   data: {
     *     // ... data to create a Thread
     *   }
     * })
     * 
     */
    create<T extends ThreadCreateArgs>(args: SelectSubset<T, ThreadCreateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Threads.
     * @param {ThreadCreateManyArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThreadCreateManyArgs>(args?: SelectSubset<T, ThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Threads and returns the data saved in the database.
     * @param {ThreadCreateManyAndReturnArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, ThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Thread.
     * @param {ThreadDeleteArgs} args - Arguments to delete one Thread.
     * @example
     * // Delete one Thread
     * const Thread = await prisma.thread.delete({
     *   where: {
     *     // ... filter to delete one Thread
     *   }
     * })
     * 
     */
    delete<T extends ThreadDeleteArgs>(args: SelectSubset<T, ThreadDeleteArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Thread.
     * @param {ThreadUpdateArgs} args - Arguments to update one Thread.
     * @example
     * // Update one Thread
     * const thread = await prisma.thread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThreadUpdateArgs>(args: SelectSubset<T, ThreadUpdateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Threads.
     * @param {ThreadDeleteManyArgs} args - Arguments to filter Threads to delete.
     * @example
     * // Delete a few Threads
     * const { count } = await prisma.thread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThreadDeleteManyArgs>(args?: SelectSubset<T, ThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThreadUpdateManyArgs>(args: SelectSubset<T, ThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads and returns the data updated in the database.
     * @param {ThreadUpdateManyAndReturnArgs} args - Arguments to update many Threads.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, ThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Thread.
     * @param {ThreadUpsertArgs} args - Arguments to update or create a Thread.
     * @example
     * // Update or create a Thread
     * const thread = await prisma.thread.upsert({
     *   create: {
     *     // ... data to create a Thread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Thread we want to update
     *   }
     * })
     */
    upsert<T extends ThreadUpsertArgs>(args: SelectSubset<T, ThreadUpsertArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCountArgs} args - Arguments to filter Threads to count.
     * @example
     * // Count the number of Threads
     * const count = await prisma.thread.count({
     *   where: {
     *     // ... the filter for the Threads we want to count
     *   }
     * })
    **/
    count<T extends ThreadCountArgs>(
      args?: Subset<T, ThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThreadAggregateArgs>(args: Subset<T, ThreadAggregateArgs>): Prisma.PrismaPromise<GetThreadAggregateType<T>>

    /**
     * Group by Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThreadGroupByArgs['orderBy'] }
        : { orderBy?: ThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Thread model
   */
  readonly fields: ThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Thread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emails<T extends Thread$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Thread$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    drafts<T extends Thread$draftsArgs<ExtArgs> = {}>(args?: Subset<T, Thread$draftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiAnalyses<T extends Thread$aiAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Thread$aiAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Thread model
   */
  interface ThreadFieldRefs {
    readonly id: FieldRef<"Thread", 'String'>
    readonly userId: FieldRef<"Thread", 'String'>
    readonly accountId: FieldRef<"Thread", 'String'>
    readonly subject: FieldRef<"Thread", 'String'>
    readonly lastMessageDate: FieldRef<"Thread", 'DateTime'>
    readonly snippet: FieldRef<"Thread", 'String'>
    readonly unread: FieldRef<"Thread", 'Boolean'>
    readonly folder: FieldRef<"Thread", 'String'>
    readonly messageCount: FieldRef<"Thread", 'Int'>
    readonly createdAt: FieldRef<"Thread", 'DateTime'>
    readonly updatedAt: FieldRef<"Thread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Thread findUnique
   */
  export type ThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findUniqueOrThrow
   */
  export type ThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findFirst
   */
  export type ThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findFirstOrThrow
   */
  export type ThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findMany
   */
  export type ThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Threads to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread create
   */
  export type ThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The data needed to create a Thread.
     */
    data: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
  }

  /**
   * Thread createMany
   */
  export type ThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Thread createManyAndReturn
   */
  export type ThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Thread update
   */
  export type ThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The data needed to update a Thread.
     */
    data: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
    /**
     * Choose, which Thread to update.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread updateMany
   */
  export type ThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
  }

  /**
   * Thread updateManyAndReturn
   */
  export type ThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Thread upsert
   */
  export type ThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The filter to search for the Thread to update in case it exists.
     */
    where: ThreadWhereUniqueInput
    /**
     * In case the Thread found by the `where` argument doesn't exist, create a new Thread with this data.
     */
    create: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
    /**
     * In case the Thread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
  }

  /**
   * Thread delete
   */
  export type ThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter which Thread to delete.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread deleteMany
   */
  export type ThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Threads to delete
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to delete.
     */
    limit?: number
  }

  /**
   * Thread.emails
   */
  export type Thread$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Thread.drafts
   */
  export type Thread$draftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    where?: DraftWhereInput
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    cursor?: DraftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * Thread.aiAnalyses
   */
  export type Thread$aiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    cursor?: AIAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * Thread without action
   */
  export type ThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
  }


  /**
   * Model Email
   */

  export type AggregateEmail = {
    _count: EmailCountAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  export type EmailMinAggregateOutputType = {
    id: string | null
    threadId: string | null
    userId: string | null
    accountId: string | null
    subject: string | null
    sentAt: Date | null
    receivedAt: Date | null
    body: string | null
    bodySnippet: string | null
    folder: string | null
    isRead: boolean | null
    hasAttachments: boolean | null
    internetMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailMaxAggregateOutputType = {
    id: string | null
    threadId: string | null
    userId: string | null
    accountId: string | null
    subject: string | null
    sentAt: Date | null
    receivedAt: Date | null
    body: string | null
    bodySnippet: string | null
    folder: string | null
    isRead: boolean | null
    hasAttachments: boolean | null
    internetMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailCountAggregateOutputType = {
    id: number
    threadId: number
    userId: number
    accountId: number
    subject: number
    from: number
    to: number
    cc: number
    bcc: number
    replyTo: number
    sentAt: number
    receivedAt: number
    body: number
    bodySnippet: number
    sysClassifications: number
    keywords: number
    sysLabels: number
    folder: number
    isRead: number
    hasAttachments: number
    internetHeaders: number
    internetMessageId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailMinAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    accountId?: true
    subject?: true
    sentAt?: true
    receivedAt?: true
    body?: true
    bodySnippet?: true
    folder?: true
    isRead?: true
    hasAttachments?: true
    internetMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailMaxAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    accountId?: true
    subject?: true
    sentAt?: true
    receivedAt?: true
    body?: true
    bodySnippet?: true
    folder?: true
    isRead?: true
    hasAttachments?: true
    internetMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailCountAggregateInputType = {
    id?: true
    threadId?: true
    userId?: true
    accountId?: true
    subject?: true
    from?: true
    to?: true
    cc?: true
    bcc?: true
    replyTo?: true
    sentAt?: true
    receivedAt?: true
    body?: true
    bodySnippet?: true
    sysClassifications?: true
    keywords?: true
    sysLabels?: true
    folder?: true
    isRead?: true
    hasAttachments?: true
    internetHeaders?: true
    internetMessageId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Email to aggregate.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emails
    **/
    _count?: true | EmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailMaxAggregateInputType
  }

  export type GetEmailAggregateType<T extends EmailAggregateArgs> = {
        [P in keyof T & keyof AggregateEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmail[P]>
      : GetScalarType<T[P], AggregateEmail[P]>
  }




  export type EmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithAggregationInput | EmailOrderByWithAggregationInput[]
    by: EmailScalarFieldEnum[] | EmailScalarFieldEnum
    having?: EmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailCountAggregateInputType | true
    _min?: EmailMinAggregateInputType
    _max?: EmailMaxAggregateInputType
  }

  export type EmailGroupByOutputType = {
    id: string
    threadId: string
    userId: string
    accountId: string
    subject: string | null
    from: JsonValue
    to: JsonValue
    cc: JsonValue | null
    bcc: JsonValue | null
    replyTo: JsonValue | null
    sentAt: Date
    receivedAt: Date | null
    body: string | null
    bodySnippet: string | null
    sysClassifications: JsonValue | null
    keywords: JsonValue | null
    sysLabels: JsonValue | null
    folder: string | null
    isRead: boolean
    hasAttachments: boolean
    internetHeaders: JsonValue | null
    internetMessageId: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmailCountAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  type GetEmailGroupByPayload<T extends EmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailGroupByOutputType[P]>
            : GetScalarType<T[P], EmailGroupByOutputType[P]>
        }
      >
    >


  export type EmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    replyTo?: boolean
    sentAt?: boolean
    receivedAt?: boolean
    body?: boolean
    bodySnippet?: boolean
    sysClassifications?: boolean
    keywords?: boolean
    sysLabels?: boolean
    folder?: boolean
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: boolean
    internetMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    attachments?: boolean | Email$attachmentsArgs<ExtArgs>
    aiAnalyses?: boolean | Email$aiAnalysesArgs<ExtArgs>
    _count?: boolean | EmailCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    replyTo?: boolean
    sentAt?: boolean
    receivedAt?: boolean
    body?: boolean
    bodySnippet?: boolean
    sysClassifications?: boolean
    keywords?: boolean
    sysLabels?: boolean
    folder?: boolean
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: boolean
    internetMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    replyTo?: boolean
    sentAt?: boolean
    receivedAt?: boolean
    body?: boolean
    bodySnippet?: boolean
    sysClassifications?: boolean
    keywords?: boolean
    sysLabels?: boolean
    folder?: boolean
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: boolean
    internetMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectScalar = {
    id?: boolean
    threadId?: boolean
    userId?: boolean
    accountId?: boolean
    subject?: boolean
    from?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    replyTo?: boolean
    sentAt?: boolean
    receivedAt?: boolean
    body?: boolean
    bodySnippet?: boolean
    sysClassifications?: boolean
    keywords?: boolean
    sysLabels?: boolean
    folder?: boolean
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: boolean
    internetMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "userId" | "accountId" | "subject" | "from" | "to" | "cc" | "bcc" | "replyTo" | "sentAt" | "receivedAt" | "body" | "bodySnippet" | "sysClassifications" | "keywords" | "sysLabels" | "folder" | "isRead" | "hasAttachments" | "internetHeaders" | "internetMessageId" | "createdAt" | "updatedAt", ExtArgs["result"]["email"]>
  export type EmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    attachments?: boolean | Email$attachmentsArgs<ExtArgs>
    aiAnalyses?: boolean | Email$aiAnalysesArgs<ExtArgs>
    _count?: boolean | EmailCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
  }
  export type EmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
  }

  export type $EmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Email"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
      thread: Prisma.$ThreadPayload<ExtArgs>
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
      aiAnalyses: Prisma.$AIAnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      threadId: string
      userId: string
      accountId: string
      subject: string | null
      from: Prisma.JsonValue
      to: Prisma.JsonValue
      cc: Prisma.JsonValue | null
      bcc: Prisma.JsonValue | null
      replyTo: Prisma.JsonValue | null
      sentAt: Date
      receivedAt: Date | null
      body: string | null
      bodySnippet: string | null
      sysClassifications: Prisma.JsonValue | null
      keywords: Prisma.JsonValue | null
      sysLabels: Prisma.JsonValue | null
      folder: string | null
      isRead: boolean
      hasAttachments: boolean
      internetHeaders: Prisma.JsonValue | null
      internetMessageId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["email"]>
    composites: {}
  }

  type EmailGetPayload<S extends boolean | null | undefined | EmailDefaultArgs> = $Result.GetResult<Prisma.$EmailPayload, S>

  type EmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailCountAggregateInputType | true
    }

  export interface EmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Email'], meta: { name: 'Email' } }
    /**
     * Find zero or one Email that matches the filter.
     * @param {EmailFindUniqueArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailFindUniqueArgs>(args: SelectSubset<T, EmailFindUniqueArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Email that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailFindUniqueOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailFindFirstArgs>(args?: SelectSubset<T, EmailFindFirstArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emails
     * const emails = await prisma.email.findMany()
     * 
     * // Get first 10 Emails
     * const emails = await prisma.email.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailWithIdOnly = await prisma.email.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailFindManyArgs>(args?: SelectSubset<T, EmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Email.
     * @param {EmailCreateArgs} args - Arguments to create a Email.
     * @example
     * // Create one Email
     * const Email = await prisma.email.create({
     *   data: {
     *     // ... data to create a Email
     *   }
     * })
     * 
     */
    create<T extends EmailCreateArgs>(args: SelectSubset<T, EmailCreateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emails.
     * @param {EmailCreateManyArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailCreateManyArgs>(args?: SelectSubset<T, EmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Emails and returns the data saved in the database.
     * @param {EmailCreateManyAndReturnArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Email.
     * @param {EmailDeleteArgs} args - Arguments to delete one Email.
     * @example
     * // Delete one Email
     * const Email = await prisma.email.delete({
     *   where: {
     *     // ... filter to delete one Email
     *   }
     * })
     * 
     */
    delete<T extends EmailDeleteArgs>(args: SelectSubset<T, EmailDeleteArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Email.
     * @param {EmailUpdateArgs} args - Arguments to update one Email.
     * @example
     * // Update one Email
     * const email = await prisma.email.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailUpdateArgs>(args: SelectSubset<T, EmailUpdateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emails.
     * @param {EmailDeleteManyArgs} args - Arguments to filter Emails to delete.
     * @example
     * // Delete a few Emails
     * const { count } = await prisma.email.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailDeleteManyArgs>(args?: SelectSubset<T, EmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailUpdateManyArgs>(args: SelectSubset<T, EmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails and returns the data updated in the database.
     * @param {EmailUpdateManyAndReturnArgs} args - Arguments to update many Emails.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Email.
     * @param {EmailUpsertArgs} args - Arguments to update or create a Email.
     * @example
     * // Update or create a Email
     * const email = await prisma.email.upsert({
     *   create: {
     *     // ... data to create a Email
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Email we want to update
     *   }
     * })
     */
    upsert<T extends EmailUpsertArgs>(args: SelectSubset<T, EmailUpsertArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCountArgs} args - Arguments to filter Emails to count.
     * @example
     * // Count the number of Emails
     * const count = await prisma.email.count({
     *   where: {
     *     // ... the filter for the Emails we want to count
     *   }
     * })
    **/
    count<T extends EmailCountArgs>(
      args?: Subset<T, EmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailAggregateArgs>(args: Subset<T, EmailAggregateArgs>): Prisma.PrismaPromise<GetEmailAggregateType<T>>

    /**
     * Group by Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailGroupByArgs['orderBy'] }
        : { orderBy?: EmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Email model
   */
  readonly fields: EmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Email.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    thread<T extends ThreadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ThreadDefaultArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attachments<T extends Email$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Email$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiAnalyses<T extends Email$aiAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Email$aiAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Email model
   */
  interface EmailFieldRefs {
    readonly id: FieldRef<"Email", 'String'>
    readonly threadId: FieldRef<"Email", 'String'>
    readonly userId: FieldRef<"Email", 'String'>
    readonly accountId: FieldRef<"Email", 'String'>
    readonly subject: FieldRef<"Email", 'String'>
    readonly from: FieldRef<"Email", 'Json'>
    readonly to: FieldRef<"Email", 'Json'>
    readonly cc: FieldRef<"Email", 'Json'>
    readonly bcc: FieldRef<"Email", 'Json'>
    readonly replyTo: FieldRef<"Email", 'Json'>
    readonly sentAt: FieldRef<"Email", 'DateTime'>
    readonly receivedAt: FieldRef<"Email", 'DateTime'>
    readonly body: FieldRef<"Email", 'String'>
    readonly bodySnippet: FieldRef<"Email", 'String'>
    readonly sysClassifications: FieldRef<"Email", 'Json'>
    readonly keywords: FieldRef<"Email", 'Json'>
    readonly sysLabels: FieldRef<"Email", 'Json'>
    readonly folder: FieldRef<"Email", 'String'>
    readonly isRead: FieldRef<"Email", 'Boolean'>
    readonly hasAttachments: FieldRef<"Email", 'Boolean'>
    readonly internetHeaders: FieldRef<"Email", 'Json'>
    readonly internetMessageId: FieldRef<"Email", 'String'>
    readonly createdAt: FieldRef<"Email", 'DateTime'>
    readonly updatedAt: FieldRef<"Email", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Email findUnique
   */
  export type EmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findUniqueOrThrow
   */
  export type EmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findFirst
   */
  export type EmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findFirstOrThrow
   */
  export type EmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findMany
   */
  export type EmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Emails to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email create
   */
  export type EmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to create a Email.
     */
    data: XOR<EmailCreateInput, EmailUncheckedCreateInput>
  }

  /**
   * Email createMany
   */
  export type EmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Email createManyAndReturn
   */
  export type EmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email update
   */
  export type EmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to update a Email.
     */
    data: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
    /**
     * Choose, which Email to update.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email updateMany
   */
  export type EmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
  }

  /**
   * Email updateManyAndReturn
   */
  export type EmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email upsert
   */
  export type EmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The filter to search for the Email to update in case it exists.
     */
    where: EmailWhereUniqueInput
    /**
     * In case the Email found by the `where` argument doesn't exist, create a new Email with this data.
     */
    create: XOR<EmailCreateInput, EmailUncheckedCreateInput>
    /**
     * In case the Email was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
  }

  /**
   * Email delete
   */
  export type EmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter which Email to delete.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email deleteMany
   */
  export type EmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emails to delete
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to delete.
     */
    limit?: number
  }

  /**
   * Email.attachments
   */
  export type Email$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Email.aiAnalyses
   */
  export type Email$aiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    cursor?: AIAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * Email without action
   */
  export type EmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
  }


  /**
   * Model EmailAddress
   */

  export type AggregateEmailAddress = {
    _count: EmailAddressCountAggregateOutputType | null
    _min: EmailAddressMinAggregateOutputType | null
    _max: EmailAddressMaxAggregateOutputType | null
  }

  export type EmailAddressMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    raw: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailAddressMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    raw: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailAddressCountAggregateOutputType = {
    id: number
    name: number
    address: number
    raw: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailAddressMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    raw?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailAddressMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    raw?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailAddressCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    raw?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailAddress to aggregate.
     */
    where?: EmailAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailAddresses to fetch.
     */
    orderBy?: EmailAddressOrderByWithRelationInput | EmailAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailAddresses
    **/
    _count?: true | EmailAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailAddressMaxAggregateInputType
  }

  export type GetEmailAddressAggregateType<T extends EmailAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailAddress[P]>
      : GetScalarType<T[P], AggregateEmailAddress[P]>
  }




  export type EmailAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailAddressWhereInput
    orderBy?: EmailAddressOrderByWithAggregationInput | EmailAddressOrderByWithAggregationInput[]
    by: EmailAddressScalarFieldEnum[] | EmailAddressScalarFieldEnum
    having?: EmailAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailAddressCountAggregateInputType | true
    _min?: EmailAddressMinAggregateInputType
    _max?: EmailAddressMaxAggregateInputType
  }

  export type EmailAddressGroupByOutputType = {
    id: string
    name: string | null
    address: string
    raw: string | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: EmailAddressCountAggregateOutputType | null
    _min: EmailAddressMinAggregateOutputType | null
    _max: EmailAddressMaxAggregateOutputType | null
  }

  type GetEmailAddressGroupByPayload<T extends EmailAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailAddressGroupByOutputType[P]>
            : GetScalarType<T[P], EmailAddressGroupByOutputType[P]>
        }
      >
    >


  export type EmailAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    raw?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailAddress"]>

  export type EmailAddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    raw?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailAddress"]>

  export type EmailAddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    raw?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailAddress"]>

  export type EmailAddressSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    raw?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailAddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "raw" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["emailAddress"]>
  export type EmailAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailAddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailAddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailAddress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      address: string
      raw: string | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailAddress"]>
    composites: {}
  }

  type EmailAddressGetPayload<S extends boolean | null | undefined | EmailAddressDefaultArgs> = $Result.GetResult<Prisma.$EmailAddressPayload, S>

  type EmailAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailAddressCountAggregateInputType | true
    }

  export interface EmailAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailAddress'], meta: { name: 'EmailAddress' } }
    /**
     * Find zero or one EmailAddress that matches the filter.
     * @param {EmailAddressFindUniqueArgs} args - Arguments to find a EmailAddress
     * @example
     * // Get one EmailAddress
     * const emailAddress = await prisma.emailAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailAddressFindUniqueArgs>(args: SelectSubset<T, EmailAddressFindUniqueArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailAddress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailAddressFindUniqueOrThrowArgs} args - Arguments to find a EmailAddress
     * @example
     * // Get one EmailAddress
     * const emailAddress = await prisma.emailAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressFindFirstArgs} args - Arguments to find a EmailAddress
     * @example
     * // Get one EmailAddress
     * const emailAddress = await prisma.emailAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailAddressFindFirstArgs>(args?: SelectSubset<T, EmailAddressFindFirstArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressFindFirstOrThrowArgs} args - Arguments to find a EmailAddress
     * @example
     * // Get one EmailAddress
     * const emailAddress = await prisma.emailAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailAddresses
     * const emailAddresses = await prisma.emailAddress.findMany()
     * 
     * // Get first 10 EmailAddresses
     * const emailAddresses = await prisma.emailAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailAddressWithIdOnly = await prisma.emailAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailAddressFindManyArgs>(args?: SelectSubset<T, EmailAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailAddress.
     * @param {EmailAddressCreateArgs} args - Arguments to create a EmailAddress.
     * @example
     * // Create one EmailAddress
     * const EmailAddress = await prisma.emailAddress.create({
     *   data: {
     *     // ... data to create a EmailAddress
     *   }
     * })
     * 
     */
    create<T extends EmailAddressCreateArgs>(args: SelectSubset<T, EmailAddressCreateArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailAddresses.
     * @param {EmailAddressCreateManyArgs} args - Arguments to create many EmailAddresses.
     * @example
     * // Create many EmailAddresses
     * const emailAddress = await prisma.emailAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailAddressCreateManyArgs>(args?: SelectSubset<T, EmailAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailAddresses and returns the data saved in the database.
     * @param {EmailAddressCreateManyAndReturnArgs} args - Arguments to create many EmailAddresses.
     * @example
     * // Create many EmailAddresses
     * const emailAddress = await prisma.emailAddress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailAddresses and only return the `id`
     * const emailAddressWithIdOnly = await prisma.emailAddress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailAddressCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailAddress.
     * @param {EmailAddressDeleteArgs} args - Arguments to delete one EmailAddress.
     * @example
     * // Delete one EmailAddress
     * const EmailAddress = await prisma.emailAddress.delete({
     *   where: {
     *     // ... filter to delete one EmailAddress
     *   }
     * })
     * 
     */
    delete<T extends EmailAddressDeleteArgs>(args: SelectSubset<T, EmailAddressDeleteArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailAddress.
     * @param {EmailAddressUpdateArgs} args - Arguments to update one EmailAddress.
     * @example
     * // Update one EmailAddress
     * const emailAddress = await prisma.emailAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailAddressUpdateArgs>(args: SelectSubset<T, EmailAddressUpdateArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailAddresses.
     * @param {EmailAddressDeleteManyArgs} args - Arguments to filter EmailAddresses to delete.
     * @example
     * // Delete a few EmailAddresses
     * const { count } = await prisma.emailAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailAddressDeleteManyArgs>(args?: SelectSubset<T, EmailAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailAddresses
     * const emailAddress = await prisma.emailAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailAddressUpdateManyArgs>(args: SelectSubset<T, EmailAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailAddresses and returns the data updated in the database.
     * @param {EmailAddressUpdateManyAndReturnArgs} args - Arguments to update many EmailAddresses.
     * @example
     * // Update many EmailAddresses
     * const emailAddress = await prisma.emailAddress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailAddresses and only return the `id`
     * const emailAddressWithIdOnly = await prisma.emailAddress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailAddressUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailAddress.
     * @param {EmailAddressUpsertArgs} args - Arguments to update or create a EmailAddress.
     * @example
     * // Update or create a EmailAddress
     * const emailAddress = await prisma.emailAddress.upsert({
     *   create: {
     *     // ... data to create a EmailAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailAddress we want to update
     *   }
     * })
     */
    upsert<T extends EmailAddressUpsertArgs>(args: SelectSubset<T, EmailAddressUpsertArgs<ExtArgs>>): Prisma__EmailAddressClient<$Result.GetResult<Prisma.$EmailAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressCountArgs} args - Arguments to filter EmailAddresses to count.
     * @example
     * // Count the number of EmailAddresses
     * const count = await prisma.emailAddress.count({
     *   where: {
     *     // ... the filter for the EmailAddresses we want to count
     *   }
     * })
    **/
    count<T extends EmailAddressCountArgs>(
      args?: Subset<T, EmailAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailAddressAggregateArgs>(args: Subset<T, EmailAddressAggregateArgs>): Prisma.PrismaPromise<GetEmailAddressAggregateType<T>>

    /**
     * Group by EmailAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailAddressGroupByArgs['orderBy'] }
        : { orderBy?: EmailAddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailAddress model
   */
  readonly fields: EmailAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailAddress model
   */
  interface EmailAddressFieldRefs {
    readonly id: FieldRef<"EmailAddress", 'String'>
    readonly name: FieldRef<"EmailAddress", 'String'>
    readonly address: FieldRef<"EmailAddress", 'String'>
    readonly raw: FieldRef<"EmailAddress", 'String'>
    readonly userId: FieldRef<"EmailAddress", 'String'>
    readonly createdAt: FieldRef<"EmailAddress", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailAddress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailAddress findUnique
   */
  export type EmailAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter, which EmailAddress to fetch.
     */
    where: EmailAddressWhereUniqueInput
  }

  /**
   * EmailAddress findUniqueOrThrow
   */
  export type EmailAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter, which EmailAddress to fetch.
     */
    where: EmailAddressWhereUniqueInput
  }

  /**
   * EmailAddress findFirst
   */
  export type EmailAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter, which EmailAddress to fetch.
     */
    where?: EmailAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailAddresses to fetch.
     */
    orderBy?: EmailAddressOrderByWithRelationInput | EmailAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailAddresses.
     */
    cursor?: EmailAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailAddresses.
     */
    distinct?: EmailAddressScalarFieldEnum | EmailAddressScalarFieldEnum[]
  }

  /**
   * EmailAddress findFirstOrThrow
   */
  export type EmailAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter, which EmailAddress to fetch.
     */
    where?: EmailAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailAddresses to fetch.
     */
    orderBy?: EmailAddressOrderByWithRelationInput | EmailAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailAddresses.
     */
    cursor?: EmailAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailAddresses.
     */
    distinct?: EmailAddressScalarFieldEnum | EmailAddressScalarFieldEnum[]
  }

  /**
   * EmailAddress findMany
   */
  export type EmailAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter, which EmailAddresses to fetch.
     */
    where?: EmailAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailAddresses to fetch.
     */
    orderBy?: EmailAddressOrderByWithRelationInput | EmailAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailAddresses.
     */
    cursor?: EmailAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailAddresses.
     */
    distinct?: EmailAddressScalarFieldEnum | EmailAddressScalarFieldEnum[]
  }

  /**
   * EmailAddress create
   */
  export type EmailAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailAddress.
     */
    data: XOR<EmailAddressCreateInput, EmailAddressUncheckedCreateInput>
  }

  /**
   * EmailAddress createMany
   */
  export type EmailAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailAddresses.
     */
    data: EmailAddressCreateManyInput | EmailAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailAddress createManyAndReturn
   */
  export type EmailAddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * The data used to create many EmailAddresses.
     */
    data: EmailAddressCreateManyInput | EmailAddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailAddress update
   */
  export type EmailAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailAddress.
     */
    data: XOR<EmailAddressUpdateInput, EmailAddressUncheckedUpdateInput>
    /**
     * Choose, which EmailAddress to update.
     */
    where: EmailAddressWhereUniqueInput
  }

  /**
   * EmailAddress updateMany
   */
  export type EmailAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailAddresses.
     */
    data: XOR<EmailAddressUpdateManyMutationInput, EmailAddressUncheckedUpdateManyInput>
    /**
     * Filter which EmailAddresses to update
     */
    where?: EmailAddressWhereInput
    /**
     * Limit how many EmailAddresses to update.
     */
    limit?: number
  }

  /**
   * EmailAddress updateManyAndReturn
   */
  export type EmailAddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * The data used to update EmailAddresses.
     */
    data: XOR<EmailAddressUpdateManyMutationInput, EmailAddressUncheckedUpdateManyInput>
    /**
     * Filter which EmailAddresses to update
     */
    where?: EmailAddressWhereInput
    /**
     * Limit how many EmailAddresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailAddress upsert
   */
  export type EmailAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailAddress to update in case it exists.
     */
    where: EmailAddressWhereUniqueInput
    /**
     * In case the EmailAddress found by the `where` argument doesn't exist, create a new EmailAddress with this data.
     */
    create: XOR<EmailAddressCreateInput, EmailAddressUncheckedCreateInput>
    /**
     * In case the EmailAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailAddressUpdateInput, EmailAddressUncheckedUpdateInput>
  }

  /**
   * EmailAddress delete
   */
  export type EmailAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
    /**
     * Filter which EmailAddress to delete.
     */
    where: EmailAddressWhereUniqueInput
  }

  /**
   * EmailAddress deleteMany
   */
  export type EmailAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailAddresses to delete
     */
    where?: EmailAddressWhereInput
    /**
     * Limit how many EmailAddresses to delete.
     */
    limit?: number
  }

  /**
   * EmailAddress without action
   */
  export type EmailAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailAddress
     */
    select?: EmailAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailAddress
     */
    omit?: EmailAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailAddressInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentAvgAggregateOutputType = {
    size: number | null
  }

  export type AttachmentSumAggregateOutputType = {
    size: number | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: string | null
    emailId: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    contentId: string | null
    contentLocation: string | null
    isInline: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: string | null
    emailId: string | null
    filename: string | null
    mimeType: string | null
    size: number | null
    contentId: string | null
    contentLocation: string | null
    isInline: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    emailId: number
    filename: number
    mimeType: number
    size: number
    contentId: number
    contentLocation: number
    isInline: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttachmentAvgAggregateInputType = {
    size?: true
  }

  export type AttachmentSumAggregateInputType = {
    size?: true
  }

  export type AttachmentMinAggregateInputType = {
    id?: true
    emailId?: true
    filename?: true
    mimeType?: true
    size?: true
    contentId?: true
    contentLocation?: true
    isInline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    emailId?: true
    filename?: true
    mimeType?: true
    size?: true
    contentId?: true
    contentLocation?: true
    isInline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    emailId?: true
    filename?: true
    mimeType?: true
    size?: true
    contentId?: true
    contentLocation?: true
    isInline?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _avg?: AttachmentAvgAggregateInputType
    _sum?: AttachmentSumAggregateInputType
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: string
    emailId: string
    filename: string
    mimeType: string
    size: number
    contentId: string | null
    contentLocation: string | null
    isInline: boolean
    createdAt: Date
    updatedAt: Date
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    contentId?: boolean
    contentLocation?: boolean
    isInline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    contentId?: boolean
    contentLocation?: boolean
    isInline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    contentId?: boolean
    contentLocation?: boolean
    isInline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    emailId?: boolean
    filename?: boolean
    mimeType?: boolean
    size?: boolean
    contentId?: boolean
    contentLocation?: boolean
    isInline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "emailId" | "filename" | "mimeType" | "size" | "contentId" | "contentLocation" | "isInline" | "createdAt" | "updatedAt", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      email: Prisma.$EmailPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emailId: string
      filename: string
      mimeType: string
      size: number
      contentId: string | null
      contentLocation: string | null
      isInline: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    email<T extends EmailDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailDefaultArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'String'>
    readonly emailId: FieldRef<"Attachment", 'String'>
    readonly filename: FieldRef<"Attachment", 'String'>
    readonly mimeType: FieldRef<"Attachment", 'String'>
    readonly size: FieldRef<"Attachment", 'Int'>
    readonly contentId: FieldRef<"Attachment", 'String'>
    readonly contentLocation: FieldRef<"Attachment", 'String'>
    readonly isInline: FieldRef<"Attachment", 'Boolean'>
    readonly createdAt: FieldRef<"Attachment", 'DateTime'>
    readonly updatedAt: FieldRef<"Attachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model Draft
   */

  export type AggregateDraft = {
    _count: DraftCountAggregateOutputType | null
    _min: DraftMinAggregateOutputType | null
    _max: DraftMaxAggregateOutputType | null
  }

  export type DraftMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    threadId: string | null
    subject: string | null
    body: string | null
    aiGenerated: boolean | null
    tone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DraftMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    threadId: string | null
    subject: string | null
    body: string | null
    aiGenerated: boolean | null
    tone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DraftCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    threadId: number
    to: number
    cc: number
    bcc: number
    subject: number
    body: number
    aiGenerated: number
    tone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DraftMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    threadId?: true
    subject?: true
    body?: true
    aiGenerated?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DraftMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    threadId?: true
    subject?: true
    body?: true
    aiGenerated?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DraftCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    threadId?: true
    to?: true
    cc?: true
    bcc?: true
    subject?: true
    body?: true
    aiGenerated?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Draft to aggregate.
     */
    where?: DraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drafts to fetch.
     */
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drafts
    **/
    _count?: true | DraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DraftMaxAggregateInputType
  }

  export type GetDraftAggregateType<T extends DraftAggregateArgs> = {
        [P in keyof T & keyof AggregateDraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDraft[P]>
      : GetScalarType<T[P], AggregateDraft[P]>
  }




  export type DraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DraftWhereInput
    orderBy?: DraftOrderByWithAggregationInput | DraftOrderByWithAggregationInput[]
    by: DraftScalarFieldEnum[] | DraftScalarFieldEnum
    having?: DraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DraftCountAggregateInputType | true
    _min?: DraftMinAggregateInputType
    _max?: DraftMaxAggregateInputType
  }

  export type DraftGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    threadId: string | null
    to: JsonValue | null
    cc: JsonValue | null
    bcc: JsonValue | null
    subject: string | null
    body: string | null
    aiGenerated: boolean
    tone: string | null
    createdAt: Date
    updatedAt: Date
    _count: DraftCountAggregateOutputType | null
    _min: DraftMinAggregateOutputType | null
    _max: DraftMaxAggregateOutputType | null
  }

  type GetDraftGroupByPayload<T extends DraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DraftGroupByOutputType[P]>
            : GetScalarType<T[P], DraftGroupByOutputType[P]>
        }
      >
    >


  export type DraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    threadId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    aiGenerated?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }, ExtArgs["result"]["draft"]>

  export type DraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    threadId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    aiGenerated?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }, ExtArgs["result"]["draft"]>

  export type DraftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    threadId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    aiGenerated?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }, ExtArgs["result"]["draft"]>

  export type DraftSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    threadId?: boolean
    to?: boolean
    cc?: boolean
    bcc?: boolean
    subject?: boolean
    body?: boolean
    aiGenerated?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DraftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountId" | "threadId" | "to" | "cc" | "bcc" | "subject" | "body" | "aiGenerated" | "tone" | "createdAt" | "updatedAt", ExtArgs["result"]["draft"]>
  export type DraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }
  export type DraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }
  export type DraftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    thread?: boolean | Draft$threadArgs<ExtArgs>
  }

  export type $DraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Draft"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
      thread: Prisma.$ThreadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      threadId: string | null
      to: Prisma.JsonValue | null
      cc: Prisma.JsonValue | null
      bcc: Prisma.JsonValue | null
      subject: string | null
      body: string | null
      aiGenerated: boolean
      tone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["draft"]>
    composites: {}
  }

  type DraftGetPayload<S extends boolean | null | undefined | DraftDefaultArgs> = $Result.GetResult<Prisma.$DraftPayload, S>

  type DraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DraftCountAggregateInputType | true
    }

  export interface DraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Draft'], meta: { name: 'Draft' } }
    /**
     * Find zero or one Draft that matches the filter.
     * @param {DraftFindUniqueArgs} args - Arguments to find a Draft
     * @example
     * // Get one Draft
     * const draft = await prisma.draft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DraftFindUniqueArgs>(args: SelectSubset<T, DraftFindUniqueArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Draft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DraftFindUniqueOrThrowArgs} args - Arguments to find a Draft
     * @example
     * // Get one Draft
     * const draft = await prisma.draft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DraftFindUniqueOrThrowArgs>(args: SelectSubset<T, DraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Draft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftFindFirstArgs} args - Arguments to find a Draft
     * @example
     * // Get one Draft
     * const draft = await prisma.draft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DraftFindFirstArgs>(args?: SelectSubset<T, DraftFindFirstArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Draft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftFindFirstOrThrowArgs} args - Arguments to find a Draft
     * @example
     * // Get one Draft
     * const draft = await prisma.draft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DraftFindFirstOrThrowArgs>(args?: SelectSubset<T, DraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drafts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drafts
     * const drafts = await prisma.draft.findMany()
     * 
     * // Get first 10 Drafts
     * const drafts = await prisma.draft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const draftWithIdOnly = await prisma.draft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DraftFindManyArgs>(args?: SelectSubset<T, DraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Draft.
     * @param {DraftCreateArgs} args - Arguments to create a Draft.
     * @example
     * // Create one Draft
     * const Draft = await prisma.draft.create({
     *   data: {
     *     // ... data to create a Draft
     *   }
     * })
     * 
     */
    create<T extends DraftCreateArgs>(args: SelectSubset<T, DraftCreateArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drafts.
     * @param {DraftCreateManyArgs} args - Arguments to create many Drafts.
     * @example
     * // Create many Drafts
     * const draft = await prisma.draft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DraftCreateManyArgs>(args?: SelectSubset<T, DraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drafts and returns the data saved in the database.
     * @param {DraftCreateManyAndReturnArgs} args - Arguments to create many Drafts.
     * @example
     * // Create many Drafts
     * const draft = await prisma.draft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drafts and only return the `id`
     * const draftWithIdOnly = await prisma.draft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DraftCreateManyAndReturnArgs>(args?: SelectSubset<T, DraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Draft.
     * @param {DraftDeleteArgs} args - Arguments to delete one Draft.
     * @example
     * // Delete one Draft
     * const Draft = await prisma.draft.delete({
     *   where: {
     *     // ... filter to delete one Draft
     *   }
     * })
     * 
     */
    delete<T extends DraftDeleteArgs>(args: SelectSubset<T, DraftDeleteArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Draft.
     * @param {DraftUpdateArgs} args - Arguments to update one Draft.
     * @example
     * // Update one Draft
     * const draft = await prisma.draft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DraftUpdateArgs>(args: SelectSubset<T, DraftUpdateArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drafts.
     * @param {DraftDeleteManyArgs} args - Arguments to filter Drafts to delete.
     * @example
     * // Delete a few Drafts
     * const { count } = await prisma.draft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DraftDeleteManyArgs>(args?: SelectSubset<T, DraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drafts
     * const draft = await prisma.draft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DraftUpdateManyArgs>(args: SelectSubset<T, DraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drafts and returns the data updated in the database.
     * @param {DraftUpdateManyAndReturnArgs} args - Arguments to update many Drafts.
     * @example
     * // Update many Drafts
     * const draft = await prisma.draft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drafts and only return the `id`
     * const draftWithIdOnly = await prisma.draft.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DraftUpdateManyAndReturnArgs>(args: SelectSubset<T, DraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Draft.
     * @param {DraftUpsertArgs} args - Arguments to update or create a Draft.
     * @example
     * // Update or create a Draft
     * const draft = await prisma.draft.upsert({
     *   create: {
     *     // ... data to create a Draft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Draft we want to update
     *   }
     * })
     */
    upsert<T extends DraftUpsertArgs>(args: SelectSubset<T, DraftUpsertArgs<ExtArgs>>): Prisma__DraftClient<$Result.GetResult<Prisma.$DraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftCountArgs} args - Arguments to filter Drafts to count.
     * @example
     * // Count the number of Drafts
     * const count = await prisma.draft.count({
     *   where: {
     *     // ... the filter for the Drafts we want to count
     *   }
     * })
    **/
    count<T extends DraftCountArgs>(
      args?: Subset<T, DraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Draft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DraftAggregateArgs>(args: Subset<T, DraftAggregateArgs>): Prisma.PrismaPromise<GetDraftAggregateType<T>>

    /**
     * Group by Draft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DraftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DraftGroupByArgs['orderBy'] }
        : { orderBy?: DraftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Draft model
   */
  readonly fields: DraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Draft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    thread<T extends Draft$threadArgs<ExtArgs> = {}>(args?: Subset<T, Draft$threadArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Draft model
   */
  interface DraftFieldRefs {
    readonly id: FieldRef<"Draft", 'String'>
    readonly userId: FieldRef<"Draft", 'String'>
    readonly accountId: FieldRef<"Draft", 'String'>
    readonly threadId: FieldRef<"Draft", 'String'>
    readonly to: FieldRef<"Draft", 'Json'>
    readonly cc: FieldRef<"Draft", 'Json'>
    readonly bcc: FieldRef<"Draft", 'Json'>
    readonly subject: FieldRef<"Draft", 'String'>
    readonly body: FieldRef<"Draft", 'String'>
    readonly aiGenerated: FieldRef<"Draft", 'Boolean'>
    readonly tone: FieldRef<"Draft", 'String'>
    readonly createdAt: FieldRef<"Draft", 'DateTime'>
    readonly updatedAt: FieldRef<"Draft", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Draft findUnique
   */
  export type DraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter, which Draft to fetch.
     */
    where: DraftWhereUniqueInput
  }

  /**
   * Draft findUniqueOrThrow
   */
  export type DraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter, which Draft to fetch.
     */
    where: DraftWhereUniqueInput
  }

  /**
   * Draft findFirst
   */
  export type DraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter, which Draft to fetch.
     */
    where?: DraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drafts to fetch.
     */
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drafts.
     */
    cursor?: DraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drafts.
     */
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * Draft findFirstOrThrow
   */
  export type DraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter, which Draft to fetch.
     */
    where?: DraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drafts to fetch.
     */
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drafts.
     */
    cursor?: DraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drafts.
     */
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * Draft findMany
   */
  export type DraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter, which Drafts to fetch.
     */
    where?: DraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drafts to fetch.
     */
    orderBy?: DraftOrderByWithRelationInput | DraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drafts.
     */
    cursor?: DraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drafts.
     */
    distinct?: DraftScalarFieldEnum | DraftScalarFieldEnum[]
  }

  /**
   * Draft create
   */
  export type DraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * The data needed to create a Draft.
     */
    data: XOR<DraftCreateInput, DraftUncheckedCreateInput>
  }

  /**
   * Draft createMany
   */
  export type DraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drafts.
     */
    data: DraftCreateManyInput | DraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Draft createManyAndReturn
   */
  export type DraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * The data used to create many Drafts.
     */
    data: DraftCreateManyInput | DraftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Draft update
   */
  export type DraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * The data needed to update a Draft.
     */
    data: XOR<DraftUpdateInput, DraftUncheckedUpdateInput>
    /**
     * Choose, which Draft to update.
     */
    where: DraftWhereUniqueInput
  }

  /**
   * Draft updateMany
   */
  export type DraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drafts.
     */
    data: XOR<DraftUpdateManyMutationInput, DraftUncheckedUpdateManyInput>
    /**
     * Filter which Drafts to update
     */
    where?: DraftWhereInput
    /**
     * Limit how many Drafts to update.
     */
    limit?: number
  }

  /**
   * Draft updateManyAndReturn
   */
  export type DraftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * The data used to update Drafts.
     */
    data: XOR<DraftUpdateManyMutationInput, DraftUncheckedUpdateManyInput>
    /**
     * Filter which Drafts to update
     */
    where?: DraftWhereInput
    /**
     * Limit how many Drafts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Draft upsert
   */
  export type DraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * The filter to search for the Draft to update in case it exists.
     */
    where: DraftWhereUniqueInput
    /**
     * In case the Draft found by the `where` argument doesn't exist, create a new Draft with this data.
     */
    create: XOR<DraftCreateInput, DraftUncheckedCreateInput>
    /**
     * In case the Draft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DraftUpdateInput, DraftUncheckedUpdateInput>
  }

  /**
   * Draft delete
   */
  export type DraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
    /**
     * Filter which Draft to delete.
     */
    where: DraftWhereUniqueInput
  }

  /**
   * Draft deleteMany
   */
  export type DraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drafts to delete
     */
    where?: DraftWhereInput
    /**
     * Limit how many Drafts to delete.
     */
    limit?: number
  }

  /**
   * Draft.thread
   */
  export type Draft$threadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    where?: ThreadWhereInput
  }

  /**
   * Draft without action
   */
  export type DraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Draft
     */
    select?: DraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Draft
     */
    omit?: DraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DraftInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  export type WebhookEventMinAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    eventType: string | null
    accountId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    eventType: string | null
    accountId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEventCountAggregateOutputType = {
    id: number
    provider: number
    eventId: number
    eventType: number
    accountId: number
    payload: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebhookEventMinAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    eventType?: true
    accountId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEventMaxAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    eventType?: true
    accountId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEventCountAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    eventType?: true
    accountId?: true
    payload?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebhookEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEvents
    **/
    _count?: true | WebhookEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventMaxAggregateInputType
  }

  export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>
  }




  export type WebhookEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithAggregationInput | WebhookEventOrderByWithAggregationInput[]
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum
    having?: WebhookEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventCountAggregateInputType | true
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
  }

  export type WebhookEventGroupByOutputType = {
    id: string
    provider: string
    eventId: string
    eventType: string
    accountId: string | null
    payload: JsonValue | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    eventType?: boolean
    accountId?: boolean
    payload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    eventType?: boolean
    accountId?: boolean
    payload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    eventType?: boolean
    accountId?: boolean
    payload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectScalar = {
    id?: boolean
    provider?: boolean
    eventId?: boolean
    eventType?: boolean
    accountId?: boolean
    payload?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebhookEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "eventId" | "eventType" | "accountId" | "payload" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["webhookEvent"]>

  export type $WebhookEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      eventId: string
      eventType: string
      accountId: string | null
      payload: Prisma.JsonValue | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webhookEvent"]>
    composites: {}
  }

  type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventPayload, S>

  type WebhookEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventCountAggregateInputType | true
    }

  export interface WebhookEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     * 
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventFindManyArgs>(args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     * 
     */
    create<T extends WebhookEventCreateArgs>(args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventCreateManyArgs>(args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventDeleteArgs>(args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventUpdateArgs>(args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEventAggregateArgs>(args: Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEvent model
   */
  readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<"WebhookEvent", 'String'>
    readonly provider: FieldRef<"WebhookEvent", 'String'>
    readonly eventId: FieldRef<"WebhookEvent", 'String'>
    readonly eventType: FieldRef<"WebhookEvent", 'String'>
    readonly accountId: FieldRef<"WebhookEvent", 'String'>
    readonly payload: FieldRef<"WebhookEvent", 'Json'>
    readonly status: FieldRef<"WebhookEvent", 'String'>
    readonly createdAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"WebhookEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
  }

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
  }

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number
  }

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
  }


  /**
   * Model AIAnalysis
   */

  export type AggregateAIAnalysis = {
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  export type AIAnalysisMinAggregateOutputType = {
    id: string | null
    userId: string | null
    threadId: string | null
    emailId: string | null
    type: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIAnalysisMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    threadId: string | null
    emailId: string | null
    type: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIAnalysisCountAggregateOutputType = {
    id: number
    userId: number
    threadId: number
    emailId: number
    type: number
    summary: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIAnalysisMinAggregateInputType = {
    id?: true
    userId?: true
    threadId?: true
    emailId?: true
    type?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIAnalysisMaxAggregateInputType = {
    id?: true
    userId?: true
    threadId?: true
    emailId?: true
    type?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIAnalysisCountAggregateInputType = {
    id?: true
    userId?: true
    threadId?: true
    emailId?: true
    type?: true
    summary?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalysis to aggregate.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAnalyses
    **/
    _count?: true | AIAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type GetAIAnalysisAggregateType<T extends AIAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAnalysis[P]>
      : GetScalarType<T[P], AggregateAIAnalysis[P]>
  }




  export type AIAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithAggregationInput | AIAnalysisOrderByWithAggregationInput[]
    by: AIAnalysisScalarFieldEnum[] | AIAnalysisScalarFieldEnum
    having?: AIAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAnalysisCountAggregateInputType | true
    _min?: AIAnalysisMinAggregateInputType
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type AIAnalysisGroupByOutputType = {
    id: string
    userId: string
    threadId: string | null
    emailId: string | null
    type: string
    summary: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  type GetAIAnalysisGroupByPayload<T extends AIAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AIAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    threadId?: boolean
    emailId?: boolean
    type?: boolean
    summary?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    threadId?: boolean
    emailId?: boolean
    type?: boolean
    summary?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    threadId?: boolean
    emailId?: boolean
    type?: boolean
    summary?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectScalar = {
    id?: boolean
    userId?: boolean
    threadId?: boolean
    emailId?: boolean
    type?: boolean
    summary?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "threadId" | "emailId" | "type" | "summary" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["aIAnalysis"]>
  export type AIAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }
  export type AIAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }
  export type AIAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    thread?: boolean | AIAnalysis$threadArgs<ExtArgs>
    email?: boolean | AIAnalysis$emailArgs<ExtArgs>
  }

  export type $AIAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAnalysis"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      thread: Prisma.$ThreadPayload<ExtArgs> | null
      email: Prisma.$EmailPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      threadId: string | null
      emailId: string | null
      type: string
      summary: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIAnalysis"]>
    composites: {}
  }

  type AIAnalysisGetPayload<S extends boolean | null | undefined | AIAnalysisDefaultArgs> = $Result.GetResult<Prisma.$AIAnalysisPayload, S>

  type AIAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIAnalysisCountAggregateInputType | true
    }

  export interface AIAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAnalysis'], meta: { name: 'AIAnalysis' } }
    /**
     * Find zero or one AIAnalysis that matches the filter.
     * @param {AIAnalysisFindUniqueArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAnalysisFindUniqueArgs>(args: SelectSubset<T, AIAnalysisFindUniqueArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIAnalysisFindUniqueOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAnalysisFindFirstArgs>(args?: SelectSubset<T, AIAnalysisFindFirstArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany()
     * 
     * // Get first 10 AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAnalysisFindManyArgs>(args?: SelectSubset<T, AIAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIAnalysis.
     * @param {AIAnalysisCreateArgs} args - Arguments to create a AIAnalysis.
     * @example
     * // Create one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.create({
     *   data: {
     *     // ... data to create a AIAnalysis
     *   }
     * })
     * 
     */
    create<T extends AIAnalysisCreateArgs>(args: SelectSubset<T, AIAnalysisCreateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIAnalyses.
     * @param {AIAnalysisCreateManyArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAnalysisCreateManyArgs>(args?: SelectSubset<T, AIAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAnalyses and returns the data saved in the database.
     * @param {AIAnalysisCreateManyAndReturnArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIAnalysis.
     * @param {AIAnalysisDeleteArgs} args - Arguments to delete one AIAnalysis.
     * @example
     * // Delete one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.delete({
     *   where: {
     *     // ... filter to delete one AIAnalysis
     *   }
     * })
     * 
     */
    delete<T extends AIAnalysisDeleteArgs>(args: SelectSubset<T, AIAnalysisDeleteArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIAnalysis.
     * @param {AIAnalysisUpdateArgs} args - Arguments to update one AIAnalysis.
     * @example
     * // Update one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAnalysisUpdateArgs>(args: SelectSubset<T, AIAnalysisUpdateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIAnalyses.
     * @param {AIAnalysisDeleteManyArgs} args - Arguments to filter AIAnalyses to delete.
     * @example
     * // Delete a few AIAnalyses
     * const { count } = await prisma.aIAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAnalysisDeleteManyArgs>(args?: SelectSubset<T, AIAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAnalysisUpdateManyArgs>(args: SelectSubset<T, AIAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses and returns the data updated in the database.
     * @param {AIAnalysisUpdateManyAndReturnArgs} args - Arguments to update many AIAnalyses.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AIAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIAnalysis.
     * @param {AIAnalysisUpsertArgs} args - Arguments to update or create a AIAnalysis.
     * @example
     * // Update or create a AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.upsert({
     *   create: {
     *     // ... data to create a AIAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends AIAnalysisUpsertArgs>(args: SelectSubset<T, AIAnalysisUpsertArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisCountArgs} args - Arguments to filter AIAnalyses to count.
     * @example
     * // Count the number of AIAnalyses
     * const count = await prisma.aIAnalysis.count({
     *   where: {
     *     // ... the filter for the AIAnalyses we want to count
     *   }
     * })
    **/
    count<T extends AIAnalysisCountArgs>(
      args?: Subset<T, AIAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIAnalysisAggregateArgs>(args: Subset<T, AIAnalysisAggregateArgs>): Prisma.PrismaPromise<GetAIAnalysisAggregateType<T>>

    /**
     * Group by AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AIAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAnalysis model
   */
  readonly fields: AIAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    thread<T extends AIAnalysis$threadArgs<ExtArgs> = {}>(args?: Subset<T, AIAnalysis$threadArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    email<T extends AIAnalysis$emailArgs<ExtArgs> = {}>(args?: Subset<T, AIAnalysis$emailArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIAnalysis model
   */
  interface AIAnalysisFieldRefs {
    readonly id: FieldRef<"AIAnalysis", 'String'>
    readonly userId: FieldRef<"AIAnalysis", 'String'>
    readonly threadId: FieldRef<"AIAnalysis", 'String'>
    readonly emailId: FieldRef<"AIAnalysis", 'String'>
    readonly type: FieldRef<"AIAnalysis", 'String'>
    readonly summary: FieldRef<"AIAnalysis", 'String'>
    readonly metadata: FieldRef<"AIAnalysis", 'Json'>
    readonly createdAt: FieldRef<"AIAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"AIAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIAnalysis findUnique
   */
  export type AIAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findUniqueOrThrow
   */
  export type AIAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findFirst
   */
  export type AIAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findFirstOrThrow
   */
  export type AIAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findMany
   */
  export type AIAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalyses to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis create
   */
  export type AIAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a AIAnalysis.
     */
    data: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
  }

  /**
   * AIAnalysis createMany
   */
  export type AIAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIAnalysis createManyAndReturn
   */
  export type AIAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis update
   */
  export type AIAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a AIAnalysis.
     */
    data: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
    /**
     * Choose, which AIAnalysis to update.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis updateMany
   */
  export type AIAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
  }

  /**
   * AIAnalysis updateManyAndReturn
   */
  export type AIAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis upsert
   */
  export type AIAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the AIAnalysis to update in case it exists.
     */
    where: AIAnalysisWhereUniqueInput
    /**
     * In case the AIAnalysis found by the `where` argument doesn't exist, create a new AIAnalysis with this data.
     */
    create: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
    /**
     * In case the AIAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
  }

  /**
   * AIAnalysis delete
   */
  export type AIAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter which AIAnalysis to delete.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis deleteMany
   */
  export type AIAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalyses to delete
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to delete.
     */
    limit?: number
  }

  /**
   * AIAnalysis.thread
   */
  export type AIAnalysis$threadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    where?: ThreadWhereInput
  }

  /**
   * AIAnalysis.email
   */
  export type AIAnalysis$emailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
  }

  /**
   * AIAnalysis without action
   */
  export type AIAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstname: 'firstname',
    lastname: 'lastname',
    time: 'time',
    email: 'email',
    imageURL: 'imageURL'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    email: 'email',
    name: 'name',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const ThreadScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    subject: 'subject',
    lastMessageDate: 'lastMessageDate',
    snippet: 'snippet',
    unread: 'unread',
    folder: 'folder',
    messageCount: 'messageCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ThreadScalarFieldEnum = (typeof ThreadScalarFieldEnum)[keyof typeof ThreadScalarFieldEnum]


  export const EmailScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    userId: 'userId',
    accountId: 'accountId',
    subject: 'subject',
    from: 'from',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    replyTo: 'replyTo',
    sentAt: 'sentAt',
    receivedAt: 'receivedAt',
    body: 'body',
    bodySnippet: 'bodySnippet',
    sysClassifications: 'sysClassifications',
    keywords: 'keywords',
    sysLabels: 'sysLabels',
    folder: 'folder',
    isRead: 'isRead',
    hasAttachments: 'hasAttachments',
    internetHeaders: 'internetHeaders',
    internetMessageId: 'internetMessageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailScalarFieldEnum = (typeof EmailScalarFieldEnum)[keyof typeof EmailScalarFieldEnum]


  export const EmailAddressScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    raw: 'raw',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailAddressScalarFieldEnum = (typeof EmailAddressScalarFieldEnum)[keyof typeof EmailAddressScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    emailId: 'emailId',
    filename: 'filename',
    mimeType: 'mimeType',
    size: 'size',
    contentId: 'contentId',
    contentLocation: 'contentLocation',
    isInline: 'isInline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const DraftScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    threadId: 'threadId',
    to: 'to',
    cc: 'cc',
    bcc: 'bcc',
    subject: 'subject',
    body: 'body',
    aiGenerated: 'aiGenerated',
    tone: 'tone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DraftScalarFieldEnum = (typeof DraftScalarFieldEnum)[keyof typeof DraftScalarFieldEnum]


  export const WebhookEventScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    eventId: 'eventId',
    eventType: 'eventType',
    accountId: 'accountId',
    payload: 'payload',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebhookEventScalarFieldEnum = (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum]


  export const AIAnalysisScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    threadId: 'threadId',
    emailId: 'emailId',
    type: 'type',
    summary: 'summary',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIAnalysisScalarFieldEnum = (typeof AIAnalysisScalarFieldEnum)[keyof typeof AIAnalysisScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    time?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    imageURL?: StringFilter<"User"> | string
    accounts?: AccountListRelationFilter
    threads?: ThreadListRelationFilter
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
    emailAddresses?: EmailAddressListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    time?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    threads?: ThreadOrderByRelationAggregateInput
    emails?: EmailOrderByRelationAggregateInput
    drafts?: DraftOrderByRelationAggregateInput
    emailAddresses?: EmailAddressOrderByRelationAggregateInput
    aiAnalyses?: AIAnalysisOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    time?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    imageURL?: StringFilter<"User"> | string
    accounts?: AccountListRelationFilter
    threads?: ThreadListRelationFilter
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
    emailAddresses?: EmailAddressListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    time?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstname?: StringWithAggregatesFilter<"User"> | string
    lastname?: StringWithAggregatesFilter<"User"> | string
    time?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    imageURL?: StringWithAggregatesFilter<"User"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    provider?: StringNullableFilter<"Account"> | string | null
    providerAccountId?: StringNullableFilter<"Account"> | string | null
    email?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    accessToken?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    threads?: ThreadListRelationFilter
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrderInput | SortOrder
    providerAccountId?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    threads?: ThreadOrderByRelationAggregateInput
    emails?: EmailOrderByRelationAggregateInput
    drafts?: DraftOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    provider?: StringNullableFilter<"Account"> | string | null
    providerAccountId?: StringNullableFilter<"Account"> | string | null
    email?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    accessToken?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    threads?: ThreadListRelationFilter
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrderInput | SortOrder
    providerAccountId?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringNullableWithAggregatesFilter<"Account"> | string | null
    providerAccountId?: StringNullableWithAggregatesFilter<"Account"> | string | null
    email?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringWithAggregatesFilter<"Account"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type ThreadWhereInput = {
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    id?: StringFilter<"Thread"> | string
    userId?: StringFilter<"Thread"> | string
    accountId?: StringFilter<"Thread"> | string
    subject?: StringNullableFilter<"Thread"> | string | null
    lastMessageDate?: DateTimeNullableFilter<"Thread"> | Date | string | null
    snippet?: StringNullableFilter<"Thread"> | string | null
    unread?: BoolFilter<"Thread"> | boolean
    folder?: StringNullableFilter<"Thread"> | string | null
    messageCount?: IntFilter<"Thread"> | number
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }

  export type ThreadOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrderInput | SortOrder
    lastMessageDate?: SortOrderInput | SortOrder
    snippet?: SortOrderInput | SortOrder
    unread?: SortOrder
    folder?: SortOrderInput | SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    emails?: EmailOrderByRelationAggregateInput
    drafts?: DraftOrderByRelationAggregateInput
    aiAnalyses?: AIAnalysisOrderByRelationAggregateInput
  }

  export type ThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    userId?: StringFilter<"Thread"> | string
    accountId?: StringFilter<"Thread"> | string
    subject?: StringNullableFilter<"Thread"> | string | null
    lastMessageDate?: DateTimeNullableFilter<"Thread"> | Date | string | null
    snippet?: StringNullableFilter<"Thread"> | string | null
    unread?: BoolFilter<"Thread"> | boolean
    folder?: StringNullableFilter<"Thread"> | string | null
    messageCount?: IntFilter<"Thread"> | number
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    emails?: EmailListRelationFilter
    drafts?: DraftListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }, "id">

  export type ThreadOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrderInput | SortOrder
    lastMessageDate?: SortOrderInput | SortOrder
    snippet?: SortOrderInput | SortOrder
    unread?: SortOrder
    folder?: SortOrderInput | SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ThreadCountOrderByAggregateInput
    _avg?: ThreadAvgOrderByAggregateInput
    _max?: ThreadMaxOrderByAggregateInput
    _min?: ThreadMinOrderByAggregateInput
    _sum?: ThreadSumOrderByAggregateInput
  }

  export type ThreadScalarWhereWithAggregatesInput = {
    AND?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    OR?: ThreadScalarWhereWithAggregatesInput[]
    NOT?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Thread"> | string
    userId?: StringWithAggregatesFilter<"Thread"> | string
    accountId?: StringWithAggregatesFilter<"Thread"> | string
    subject?: StringNullableWithAggregatesFilter<"Thread"> | string | null
    lastMessageDate?: DateTimeNullableWithAggregatesFilter<"Thread"> | Date | string | null
    snippet?: StringNullableWithAggregatesFilter<"Thread"> | string | null
    unread?: BoolWithAggregatesFilter<"Thread"> | boolean
    folder?: StringNullableWithAggregatesFilter<"Thread"> | string | null
    messageCount?: IntWithAggregatesFilter<"Thread"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Thread"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Thread"> | Date | string
  }

  export type EmailWhereInput = {
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    id?: StringFilter<"Email"> | string
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    accountId?: StringFilter<"Email"> | string
    subject?: StringNullableFilter<"Email"> | string | null
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    replyTo?: JsonNullableFilter<"Email">
    sentAt?: DateTimeFilter<"Email"> | Date | string
    receivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    body?: StringNullableFilter<"Email"> | string | null
    bodySnippet?: StringNullableFilter<"Email"> | string | null
    sysClassifications?: JsonNullableFilter<"Email">
    keywords?: JsonNullableFilter<"Email">
    sysLabels?: JsonNullableFilter<"Email">
    folder?: StringNullableFilter<"Email"> | string | null
    isRead?: BoolFilter<"Email"> | boolean
    hasAttachments?: BoolFilter<"Email"> | boolean
    internetHeaders?: JsonNullableFilter<"Email">
    internetMessageId?: StringNullableFilter<"Email"> | string | null
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    thread?: XOR<ThreadScalarRelationFilter, ThreadWhereInput>
    attachments?: AttachmentListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }

  export type EmailOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrderInput | SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    replyTo?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    receivedAt?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    bodySnippet?: SortOrderInput | SortOrder
    sysClassifications?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    sysLabels?: SortOrderInput | SortOrder
    folder?: SortOrderInput | SortOrder
    isRead?: SortOrder
    hasAttachments?: SortOrder
    internetHeaders?: SortOrderInput | SortOrder
    internetMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    thread?: ThreadOrderByWithRelationInput
    attachments?: AttachmentOrderByRelationAggregateInput
    aiAnalyses?: AIAnalysisOrderByRelationAggregateInput
  }

  export type EmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    accountId?: StringFilter<"Email"> | string
    subject?: StringNullableFilter<"Email"> | string | null
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    replyTo?: JsonNullableFilter<"Email">
    sentAt?: DateTimeFilter<"Email"> | Date | string
    receivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    body?: StringNullableFilter<"Email"> | string | null
    bodySnippet?: StringNullableFilter<"Email"> | string | null
    sysClassifications?: JsonNullableFilter<"Email">
    keywords?: JsonNullableFilter<"Email">
    sysLabels?: JsonNullableFilter<"Email">
    folder?: StringNullableFilter<"Email"> | string | null
    isRead?: BoolFilter<"Email"> | boolean
    hasAttachments?: BoolFilter<"Email"> | boolean
    internetHeaders?: JsonNullableFilter<"Email">
    internetMessageId?: StringNullableFilter<"Email"> | string | null
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    thread?: XOR<ThreadScalarRelationFilter, ThreadWhereInput>
    attachments?: AttachmentListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
  }, "id">

  export type EmailOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrderInput | SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    replyTo?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    receivedAt?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    bodySnippet?: SortOrderInput | SortOrder
    sysClassifications?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    sysLabels?: SortOrderInput | SortOrder
    folder?: SortOrderInput | SortOrder
    isRead?: SortOrder
    hasAttachments?: SortOrder
    internetHeaders?: SortOrderInput | SortOrder
    internetMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailCountOrderByAggregateInput
    _max?: EmailMaxOrderByAggregateInput
    _min?: EmailMinOrderByAggregateInput
  }

  export type EmailScalarWhereWithAggregatesInput = {
    AND?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    OR?: EmailScalarWhereWithAggregatesInput[]
    NOT?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Email"> | string
    threadId?: StringWithAggregatesFilter<"Email"> | string
    userId?: StringWithAggregatesFilter<"Email"> | string
    accountId?: StringWithAggregatesFilter<"Email"> | string
    subject?: StringNullableWithAggregatesFilter<"Email"> | string | null
    from?: JsonWithAggregatesFilter<"Email">
    to?: JsonWithAggregatesFilter<"Email">
    cc?: JsonNullableWithAggregatesFilter<"Email">
    bcc?: JsonNullableWithAggregatesFilter<"Email">
    replyTo?: JsonNullableWithAggregatesFilter<"Email">
    sentAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    receivedAt?: DateTimeNullableWithAggregatesFilter<"Email"> | Date | string | null
    body?: StringNullableWithAggregatesFilter<"Email"> | string | null
    bodySnippet?: StringNullableWithAggregatesFilter<"Email"> | string | null
    sysClassifications?: JsonNullableWithAggregatesFilter<"Email">
    keywords?: JsonNullableWithAggregatesFilter<"Email">
    sysLabels?: JsonNullableWithAggregatesFilter<"Email">
    folder?: StringNullableWithAggregatesFilter<"Email"> | string | null
    isRead?: BoolWithAggregatesFilter<"Email"> | boolean
    hasAttachments?: BoolWithAggregatesFilter<"Email"> | boolean
    internetHeaders?: JsonNullableWithAggregatesFilter<"Email">
    internetMessageId?: StringNullableWithAggregatesFilter<"Email"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
  }

  export type EmailAddressWhereInput = {
    AND?: EmailAddressWhereInput | EmailAddressWhereInput[]
    OR?: EmailAddressWhereInput[]
    NOT?: EmailAddressWhereInput | EmailAddressWhereInput[]
    id?: StringFilter<"EmailAddress"> | string
    name?: StringNullableFilter<"EmailAddress"> | string | null
    address?: StringFilter<"EmailAddress"> | string
    raw?: StringNullableFilter<"EmailAddress"> | string | null
    userId?: StringFilter<"EmailAddress"> | string
    createdAt?: DateTimeFilter<"EmailAddress"> | Date | string
    updatedAt?: DateTimeFilter<"EmailAddress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailAddressOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrder
    raw?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailAddressWhereInput | EmailAddressWhereInput[]
    OR?: EmailAddressWhereInput[]
    NOT?: EmailAddressWhereInput | EmailAddressWhereInput[]
    name?: StringNullableFilter<"EmailAddress"> | string | null
    address?: StringFilter<"EmailAddress"> | string
    raw?: StringNullableFilter<"EmailAddress"> | string | null
    userId?: StringFilter<"EmailAddress"> | string
    createdAt?: DateTimeFilter<"EmailAddress"> | Date | string
    updatedAt?: DateTimeFilter<"EmailAddress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EmailAddressOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrder
    raw?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailAddressCountOrderByAggregateInput
    _max?: EmailAddressMaxOrderByAggregateInput
    _min?: EmailAddressMinOrderByAggregateInput
  }

  export type EmailAddressScalarWhereWithAggregatesInput = {
    AND?: EmailAddressScalarWhereWithAggregatesInput | EmailAddressScalarWhereWithAggregatesInput[]
    OR?: EmailAddressScalarWhereWithAggregatesInput[]
    NOT?: EmailAddressScalarWhereWithAggregatesInput | EmailAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailAddress"> | string
    name?: StringNullableWithAggregatesFilter<"EmailAddress"> | string | null
    address?: StringWithAggregatesFilter<"EmailAddress"> | string
    raw?: StringNullableWithAggregatesFilter<"EmailAddress"> | string | null
    userId?: StringWithAggregatesFilter<"EmailAddress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailAddress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailAddress"> | Date | string
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: StringFilter<"Attachment"> | string
    emailId?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    contentId?: StringNullableFilter<"Attachment"> | string | null
    contentLocation?: StringNullableFilter<"Attachment"> | string | null
    isInline?: BoolFilter<"Attachment"> | boolean
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
    email?: XOR<EmailScalarRelationFilter, EmailWhereInput>
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    emailId?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    contentId?: SortOrderInput | SortOrder
    contentLocation?: SortOrderInput | SortOrder
    isInline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: EmailOrderByWithRelationInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    emailId?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    contentId?: StringNullableFilter<"Attachment"> | string | null
    contentLocation?: StringNullableFilter<"Attachment"> | string | null
    isInline?: BoolFilter<"Attachment"> | boolean
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
    email?: XOR<EmailScalarRelationFilter, EmailWhereInput>
  }, "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    emailId?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    contentId?: SortOrderInput | SortOrder
    contentLocation?: SortOrderInput | SortOrder
    isInline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _avg?: AttachmentAvgOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
    _sum?: AttachmentSumOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attachment"> | string
    emailId?: StringWithAggregatesFilter<"Attachment"> | string
    filename?: StringWithAggregatesFilter<"Attachment"> | string
    mimeType?: StringWithAggregatesFilter<"Attachment"> | string
    size?: IntWithAggregatesFilter<"Attachment"> | number
    contentId?: StringNullableWithAggregatesFilter<"Attachment"> | string | null
    contentLocation?: StringNullableWithAggregatesFilter<"Attachment"> | string | null
    isInline?: BoolWithAggregatesFilter<"Attachment"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attachment"> | Date | string
  }

  export type DraftWhereInput = {
    AND?: DraftWhereInput | DraftWhereInput[]
    OR?: DraftWhereInput[]
    NOT?: DraftWhereInput | DraftWhereInput[]
    id?: StringFilter<"Draft"> | string
    userId?: StringFilter<"Draft"> | string
    accountId?: StringFilter<"Draft"> | string
    threadId?: StringNullableFilter<"Draft"> | string | null
    to?: JsonNullableFilter<"Draft">
    cc?: JsonNullableFilter<"Draft">
    bcc?: JsonNullableFilter<"Draft">
    subject?: StringNullableFilter<"Draft"> | string | null
    body?: StringNullableFilter<"Draft"> | string | null
    aiGenerated?: BoolFilter<"Draft"> | boolean
    tone?: StringNullableFilter<"Draft"> | string | null
    createdAt?: DateTimeFilter<"Draft"> | Date | string
    updatedAt?: DateTimeFilter<"Draft"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    thread?: XOR<ThreadNullableScalarRelationFilter, ThreadWhereInput> | null
  }

  export type DraftOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    to?: SortOrderInput | SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    tone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    thread?: ThreadOrderByWithRelationInput
  }

  export type DraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DraftWhereInput | DraftWhereInput[]
    OR?: DraftWhereInput[]
    NOT?: DraftWhereInput | DraftWhereInput[]
    userId?: StringFilter<"Draft"> | string
    accountId?: StringFilter<"Draft"> | string
    threadId?: StringNullableFilter<"Draft"> | string | null
    to?: JsonNullableFilter<"Draft">
    cc?: JsonNullableFilter<"Draft">
    bcc?: JsonNullableFilter<"Draft">
    subject?: StringNullableFilter<"Draft"> | string | null
    body?: StringNullableFilter<"Draft"> | string | null
    aiGenerated?: BoolFilter<"Draft"> | boolean
    tone?: StringNullableFilter<"Draft"> | string | null
    createdAt?: DateTimeFilter<"Draft"> | Date | string
    updatedAt?: DateTimeFilter<"Draft"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    thread?: XOR<ThreadNullableScalarRelationFilter, ThreadWhereInput> | null
  }, "id">

  export type DraftOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    to?: SortOrderInput | SortOrder
    cc?: SortOrderInput | SortOrder
    bcc?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    aiGenerated?: SortOrder
    tone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DraftCountOrderByAggregateInput
    _max?: DraftMaxOrderByAggregateInput
    _min?: DraftMinOrderByAggregateInput
  }

  export type DraftScalarWhereWithAggregatesInput = {
    AND?: DraftScalarWhereWithAggregatesInput | DraftScalarWhereWithAggregatesInput[]
    OR?: DraftScalarWhereWithAggregatesInput[]
    NOT?: DraftScalarWhereWithAggregatesInput | DraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Draft"> | string
    userId?: StringWithAggregatesFilter<"Draft"> | string
    accountId?: StringWithAggregatesFilter<"Draft"> | string
    threadId?: StringNullableWithAggregatesFilter<"Draft"> | string | null
    to?: JsonNullableWithAggregatesFilter<"Draft">
    cc?: JsonNullableWithAggregatesFilter<"Draft">
    bcc?: JsonNullableWithAggregatesFilter<"Draft">
    subject?: StringNullableWithAggregatesFilter<"Draft"> | string | null
    body?: StringNullableWithAggregatesFilter<"Draft"> | string | null
    aiGenerated?: BoolWithAggregatesFilter<"Draft"> | boolean
    tone?: StringNullableWithAggregatesFilter<"Draft"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Draft"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Draft"> | Date | string
  }

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    provider?: StringFilter<"WebhookEvent"> | string
    eventId?: StringFilter<"WebhookEvent"> | string
    eventType?: StringFilter<"WebhookEvent"> | string
    accountId?: StringNullableFilter<"WebhookEvent"> | string | null
    payload?: JsonNullableFilter<"WebhookEvent">
    status?: StringFilter<"WebhookEvent"> | string
    createdAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
  }

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    accountId?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId?: string
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    provider?: StringFilter<"WebhookEvent"> | string
    eventType?: StringFilter<"WebhookEvent"> | string
    accountId?: StringNullableFilter<"WebhookEvent"> | string | null
    payload?: JsonNullableFilter<"WebhookEvent">
    status?: StringFilter<"WebhookEvent"> | string
    createdAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
  }, "id" | "eventId">

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    accountId?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebhookEventCountOrderByAggregateInput
    _max?: WebhookEventMaxOrderByAggregateInput
    _min?: WebhookEventMinOrderByAggregateInput
  }

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    OR?: WebhookEventScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEvent"> | string
    provider?: StringWithAggregatesFilter<"WebhookEvent"> | string
    eventId?: StringWithAggregatesFilter<"WebhookEvent"> | string
    eventType?: StringWithAggregatesFilter<"WebhookEvent"> | string
    accountId?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    payload?: JsonNullableWithAggregatesFilter<"WebhookEvent">
    status?: StringWithAggregatesFilter<"WebhookEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
  }

  export type AIAnalysisWhereInput = {
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    userId?: StringFilter<"AIAnalysis"> | string
    threadId?: StringNullableFilter<"AIAnalysis"> | string | null
    emailId?: StringNullableFilter<"AIAnalysis"> | string | null
    type?: StringFilter<"AIAnalysis"> | string
    summary?: StringNullableFilter<"AIAnalysis"> | string | null
    metadata?: JsonNullableFilter<"AIAnalysis">
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    thread?: XOR<ThreadNullableScalarRelationFilter, ThreadWhereInput> | null
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
  }

  export type AIAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    emailId?: SortOrderInput | SortOrder
    type?: SortOrder
    summary?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    thread?: ThreadOrderByWithRelationInput
    email?: EmailOrderByWithRelationInput
  }

  export type AIAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    userId?: StringFilter<"AIAnalysis"> | string
    threadId?: StringNullableFilter<"AIAnalysis"> | string | null
    emailId?: StringNullableFilter<"AIAnalysis"> | string | null
    type?: StringFilter<"AIAnalysis"> | string
    summary?: StringNullableFilter<"AIAnalysis"> | string | null
    metadata?: JsonNullableFilter<"AIAnalysis">
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    thread?: XOR<ThreadNullableScalarRelationFilter, ThreadWhereInput> | null
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
  }, "id">

  export type AIAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    threadId?: SortOrderInput | SortOrder
    emailId?: SortOrderInput | SortOrder
    type?: SortOrder
    summary?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIAnalysisCountOrderByAggregateInput
    _max?: AIAnalysisMaxOrderByAggregateInput
    _min?: AIAnalysisMinOrderByAggregateInput
  }

  export type AIAnalysisScalarWhereWithAggregatesInput = {
    AND?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    OR?: AIAnalysisScalarWhereWithAggregatesInput[]
    NOT?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAnalysis"> | string
    userId?: StringWithAggregatesFilter<"AIAnalysis"> | string
    threadId?: StringNullableWithAggregatesFilter<"AIAnalysis"> | string | null
    emailId?: StringNullableWithAggregatesFilter<"AIAnalysis"> | string | null
    type?: StringWithAggregatesFilter<"AIAnalysis"> | string
    summary?: StringNullableWithAggregatesFilter<"AIAnalysis"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AIAnalysis">
    createdAt?: DateTimeWithAggregatesFilter<"AIAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIAnalysis"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    threads?: ThreadCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    threads?: ThreadUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    threads?: ThreadCreateNestedManyWithoutAccountInput
    emails?: EmailCreateNestedManyWithoutAccountInput
    drafts?: DraftCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    userId: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    threads?: ThreadUncheckedCreateNestedManyWithoutAccountInput
    emails?: EmailUncheckedCreateNestedManyWithoutAccountInput
    drafts?: DraftUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    threads?: ThreadUpdateManyWithoutAccountNestedInput
    emails?: EmailUpdateManyWithoutAccountNestedInput
    drafts?: DraftUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUncheckedUpdateManyWithoutAccountNestedInput
    emails?: EmailUncheckedUpdateManyWithoutAccountNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id: string
    userId: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCreateInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThreadsInput
    account: AccountCreateNestedOneWithoutThreadsInput
    emails?: EmailCreateNestedManyWithoutThreadInput
    drafts?: DraftCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutThreadInput
    drafts?: DraftUncheckedCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThreadsNestedInput
    account?: AccountUpdateOneRequiredWithoutThreadsNestedInput
    emails?: EmailUpdateManyWithoutThreadNestedInput
    drafts?: DraftUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutThreadNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ThreadCreateManyInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ThreadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCreateInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
    account: AccountCreateNestedOneWithoutEmailsInput
    thread: ThreadCreateNestedOneWithoutEmailsInput
    attachments?: AttachmentCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateInput = {
    id: string
    threadId: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
    account?: AccountUpdateOneRequiredWithoutEmailsNestedInput
    thread?: ThreadUpdateOneRequiredWithoutEmailsNestedInput
    attachments?: AttachmentUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailCreateManyInput = {
    id: string
    threadId: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressCreateInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailAddressesInput
  }

  export type EmailAddressUncheckedCreateInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailAddressesNestedInput
  }

  export type EmailAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressCreateManyInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateInput = {
    id: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    email: EmailCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id: string
    emailId: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateManyInput = {
    id: string
    emailId: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftCreateInput = {
    id: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDraftsInput
    account: AccountCreateNestedOneWithoutDraftsInput
    thread?: ThreadCreateNestedOneWithoutDraftsInput
  }

  export type DraftUncheckedCreateInput = {
    id: string
    userId: string
    accountId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDraftsNestedInput
    account?: AccountUpdateOneRequiredWithoutDraftsNestedInput
    thread?: ThreadUpdateOneWithoutDraftsNestedInput
  }

  export type DraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftCreateManyInput = {
    id: string
    userId: string
    accountId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateInput = {
    id?: string
    provider: string
    eventId: string
    eventType: string
    accountId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventUncheckedCreateInput = {
    id?: string
    provider: string
    eventId: string
    eventType: string
    accountId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateManyInput = {
    id?: string
    provider: string
    eventId: string
    eventType: string
    accountId?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateInput = {
    id?: string
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiAnalysesInput
    thread?: ThreadCreateNestedOneWithoutAiAnalysesInput
    email?: EmailCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateInput = {
    id?: string
    userId: string
    threadId?: string | null
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiAnalysesNestedInput
    thread?: ThreadUpdateOneWithoutAiAnalysesNestedInput
    email?: EmailUpdateOneWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateManyInput = {
    id?: string
    userId: string
    threadId?: string | null
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ThreadListRelationFilter = {
    every?: ThreadWhereInput
    some?: ThreadWhereInput
    none?: ThreadWhereInput
  }

  export type EmailListRelationFilter = {
    every?: EmailWhereInput
    some?: EmailWhereInput
    none?: EmailWhereInput
  }

  export type DraftListRelationFilter = {
    every?: DraftWhereInput
    some?: DraftWhereInput
    none?: DraftWhereInput
  }

  export type EmailAddressListRelationFilter = {
    every?: EmailAddressWhereInput
    some?: EmailAddressWhereInput
    none?: EmailAddressWhereInput
  }

  export type AIAnalysisListRelationFilter = {
    every?: AIAnalysisWhereInput
    some?: AIAnalysisWhereInput
    none?: AIAnalysisWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ThreadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DraftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailAddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    time?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    time?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    time?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AccountScalarRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type ThreadCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    lastMessageDate?: SortOrder
    snippet?: SortOrder
    unread?: SortOrder
    folder?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThreadAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type ThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    lastMessageDate?: SortOrder
    snippet?: SortOrder
    unread?: SortOrder
    folder?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThreadMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    lastMessageDate?: SortOrder
    snippet?: SortOrder
    unread?: SortOrder
    folder?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThreadSumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ThreadScalarRelationFilter = {
    is?: ThreadWhereInput
    isNot?: ThreadWhereInput
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    from?: SortOrder
    to?: SortOrder
    cc?: SortOrder
    bcc?: SortOrder
    replyTo?: SortOrder
    sentAt?: SortOrder
    receivedAt?: SortOrder
    body?: SortOrder
    bodySnippet?: SortOrder
    sysClassifications?: SortOrder
    keywords?: SortOrder
    sysLabels?: SortOrder
    folder?: SortOrder
    isRead?: SortOrder
    hasAttachments?: SortOrder
    internetHeaders?: SortOrder
    internetMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    sentAt?: SortOrder
    receivedAt?: SortOrder
    body?: SortOrder
    bodySnippet?: SortOrder
    folder?: SortOrder
    isRead?: SortOrder
    hasAttachments?: SortOrder
    internetMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    subject?: SortOrder
    sentAt?: SortOrder
    receivedAt?: SortOrder
    body?: SortOrder
    bodySnippet?: SortOrder
    folder?: SortOrder
    isRead?: SortOrder
    hasAttachments?: SortOrder
    internetMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EmailAddressCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    raw?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    raw?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailAddressMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    raw?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailScalarRelationFilter = {
    is?: EmailWhereInput
    isNot?: EmailWhereInput
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    contentId?: SortOrder
    contentLocation?: SortOrder
    isInline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttachmentAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    contentId?: SortOrder
    contentLocation?: SortOrder
    isInline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    filename?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    contentId?: SortOrder
    contentLocation?: SortOrder
    isInline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttachmentSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ThreadNullableScalarRelationFilter = {
    is?: ThreadWhereInput | null
    isNot?: ThreadWhereInput | null
  }

  export type DraftCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    threadId?: SortOrder
    to?: SortOrder
    cc?: SortOrder
    bcc?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    aiGenerated?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DraftMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    aiGenerated?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DraftMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    aiGenerated?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    accountId?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    accountId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    accountId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailNullableScalarRelationFilter = {
    is?: EmailWhereInput | null
    isNot?: EmailWhereInput | null
  }

  export type AIAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    threadId?: SortOrder
    emailId?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    threadId?: SortOrder
    emailId?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    threadId?: SortOrder
    emailId?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ThreadCreateNestedManyWithoutUserInput = {
    create?: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput> | ThreadCreateWithoutUserInput[] | ThreadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutUserInput | ThreadCreateOrConnectWithoutUserInput[]
    createMany?: ThreadCreateManyUserInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type EmailCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftCreateNestedManyWithoutUserInput = {
    create?: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput> | DraftCreateWithoutUserInput[] | DraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutUserInput | DraftCreateOrConnectWithoutUserInput[]
    createMany?: DraftCreateManyUserInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type EmailAddressCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput> | EmailAddressCreateWithoutUserInput[] | EmailAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailAddressCreateOrConnectWithoutUserInput | EmailAddressCreateOrConnectWithoutUserInput[]
    createMany?: EmailAddressCreateManyUserInputEnvelope
    connect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
  }

  export type AIAnalysisCreateNestedManyWithoutUserInput = {
    create?: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput> | AIAnalysisCreateWithoutUserInput[] | AIAnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutUserInput | AIAnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AIAnalysisCreateManyUserInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ThreadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput> | ThreadCreateWithoutUserInput[] | ThreadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutUserInput | ThreadCreateOrConnectWithoutUserInput[]
    createMany?: ThreadCreateManyUserInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput> | DraftCreateWithoutUserInput[] | DraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutUserInput | DraftCreateOrConnectWithoutUserInput[]
    createMany?: DraftCreateManyUserInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type EmailAddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput> | EmailAddressCreateWithoutUserInput[] | EmailAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailAddressCreateOrConnectWithoutUserInput | EmailAddressCreateOrConnectWithoutUserInput[]
    createMany?: EmailAddressCreateManyUserInputEnvelope
    connect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput> | AIAnalysisCreateWithoutUserInput[] | AIAnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutUserInput | AIAnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AIAnalysisCreateManyUserInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ThreadUpdateManyWithoutUserNestedInput = {
    create?: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput> | ThreadCreateWithoutUserInput[] | ThreadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutUserInput | ThreadCreateOrConnectWithoutUserInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutUserInput | ThreadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ThreadCreateManyUserInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutUserInput | ThreadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutUserInput | ThreadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type EmailUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUpdateManyWithoutUserNestedInput = {
    create?: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput> | DraftCreateWithoutUserInput[] | DraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutUserInput | DraftCreateOrConnectWithoutUserInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutUserInput | DraftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DraftCreateManyUserInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutUserInput | DraftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutUserInput | DraftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type EmailAddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput> | EmailAddressCreateWithoutUserInput[] | EmailAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailAddressCreateOrConnectWithoutUserInput | EmailAddressCreateOrConnectWithoutUserInput[]
    upsert?: EmailAddressUpsertWithWhereUniqueWithoutUserInput | EmailAddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailAddressCreateManyUserInputEnvelope
    set?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    disconnect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    delete?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    connect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    update?: EmailAddressUpdateWithWhereUniqueWithoutUserInput | EmailAddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailAddressUpdateManyWithWhereWithoutUserInput | EmailAddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailAddressScalarWhereInput | EmailAddressScalarWhereInput[]
  }

  export type AIAnalysisUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput> | AIAnalysisCreateWithoutUserInput[] | AIAnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutUserInput | AIAnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutUserInput | AIAnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIAnalysisCreateManyUserInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutUserInput | AIAnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutUserInput | AIAnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ThreadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput> | ThreadCreateWithoutUserInput[] | ThreadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutUserInput | ThreadCreateOrConnectWithoutUserInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutUserInput | ThreadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ThreadCreateManyUserInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutUserInput | ThreadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutUserInput | ThreadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput> | DraftCreateWithoutUserInput[] | DraftUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutUserInput | DraftCreateOrConnectWithoutUserInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutUserInput | DraftUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DraftCreateManyUserInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutUserInput | DraftUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutUserInput | DraftUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type EmailAddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput> | EmailAddressCreateWithoutUserInput[] | EmailAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailAddressCreateOrConnectWithoutUserInput | EmailAddressCreateOrConnectWithoutUserInput[]
    upsert?: EmailAddressUpsertWithWhereUniqueWithoutUserInput | EmailAddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailAddressCreateManyUserInputEnvelope
    set?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    disconnect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    delete?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    connect?: EmailAddressWhereUniqueInput | EmailAddressWhereUniqueInput[]
    update?: EmailAddressUpdateWithWhereUniqueWithoutUserInput | EmailAddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailAddressUpdateManyWithWhereWithoutUserInput | EmailAddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailAddressScalarWhereInput | EmailAddressScalarWhereInput[]
  }

  export type AIAnalysisUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput> | AIAnalysisCreateWithoutUserInput[] | AIAnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutUserInput | AIAnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutUserInput | AIAnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIAnalysisCreateManyUserInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutUserInput | AIAnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutUserInput | AIAnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type ThreadCreateNestedManyWithoutAccountInput = {
    create?: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput> | ThreadCreateWithoutAccountInput[] | ThreadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutAccountInput | ThreadCreateOrConnectWithoutAccountInput[]
    createMany?: ThreadCreateManyAccountInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type EmailCreateNestedManyWithoutAccountInput = {
    create?: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput> | EmailCreateWithoutAccountInput[] | EmailUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutAccountInput | EmailCreateOrConnectWithoutAccountInput[]
    createMany?: EmailCreateManyAccountInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftCreateNestedManyWithoutAccountInput = {
    create?: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput> | DraftCreateWithoutAccountInput[] | DraftUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutAccountInput | DraftCreateOrConnectWithoutAccountInput[]
    createMany?: DraftCreateManyAccountInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type ThreadUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput> | ThreadCreateWithoutAccountInput[] | ThreadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutAccountInput | ThreadCreateOrConnectWithoutAccountInput[]
    createMany?: ThreadCreateManyAccountInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput> | EmailCreateWithoutAccountInput[] | EmailUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutAccountInput | EmailCreateOrConnectWithoutAccountInput[]
    createMany?: EmailCreateManyAccountInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput> | DraftCreateWithoutAccountInput[] | DraftUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutAccountInput | DraftCreateOrConnectWithoutAccountInput[]
    createMany?: DraftCreateManyAccountInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type ThreadUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput> | ThreadCreateWithoutAccountInput[] | ThreadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutAccountInput | ThreadCreateOrConnectWithoutAccountInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutAccountInput | ThreadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ThreadCreateManyAccountInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutAccountInput | ThreadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutAccountInput | ThreadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type EmailUpdateManyWithoutAccountNestedInput = {
    create?: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput> | EmailCreateWithoutAccountInput[] | EmailUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutAccountInput | EmailCreateOrConnectWithoutAccountInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutAccountInput | EmailUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: EmailCreateManyAccountInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutAccountInput | EmailUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutAccountInput | EmailUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUpdateManyWithoutAccountNestedInput = {
    create?: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput> | DraftCreateWithoutAccountInput[] | DraftUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutAccountInput | DraftCreateOrConnectWithoutAccountInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutAccountInput | DraftUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: DraftCreateManyAccountInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutAccountInput | DraftUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutAccountInput | DraftUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type ThreadUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput> | ThreadCreateWithoutAccountInput[] | ThreadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutAccountInput | ThreadCreateOrConnectWithoutAccountInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutAccountInput | ThreadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ThreadCreateManyAccountInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutAccountInput | ThreadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutAccountInput | ThreadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput> | EmailCreateWithoutAccountInput[] | EmailUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutAccountInput | EmailCreateOrConnectWithoutAccountInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutAccountInput | EmailUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: EmailCreateManyAccountInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutAccountInput | EmailUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutAccountInput | EmailUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput> | DraftCreateWithoutAccountInput[] | DraftUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutAccountInput | DraftCreateOrConnectWithoutAccountInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutAccountInput | DraftUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: DraftCreateManyAccountInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutAccountInput | DraftUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutAccountInput | DraftUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutThreadsInput = {
    create?: XOR<UserCreateWithoutThreadsInput, UserUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutThreadsInput
    connect?: UserWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutThreadsInput = {
    create?: XOR<AccountCreateWithoutThreadsInput, AccountUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThreadsInput
    connect?: AccountWhereUniqueInput
  }

  export type EmailCreateNestedManyWithoutThreadInput = {
    create?: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput> | EmailCreateWithoutThreadInput[] | EmailUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutThreadInput | EmailCreateOrConnectWithoutThreadInput[]
    createMany?: EmailCreateManyThreadInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftCreateNestedManyWithoutThreadInput = {
    create?: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput> | DraftCreateWithoutThreadInput[] | DraftUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutThreadInput | DraftCreateOrConnectWithoutThreadInput[]
    createMany?: DraftCreateManyThreadInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type AIAnalysisCreateNestedManyWithoutThreadInput = {
    create?: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput> | AIAnalysisCreateWithoutThreadInput[] | AIAnalysisUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutThreadInput | AIAnalysisCreateOrConnectWithoutThreadInput[]
    createMany?: AIAnalysisCreateManyThreadInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput> | EmailCreateWithoutThreadInput[] | EmailUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutThreadInput | EmailCreateOrConnectWithoutThreadInput[]
    createMany?: EmailCreateManyThreadInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type DraftUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput> | DraftCreateWithoutThreadInput[] | DraftUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutThreadInput | DraftCreateOrConnectWithoutThreadInput[]
    createMany?: DraftCreateManyThreadInputEnvelope
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput> | AIAnalysisCreateWithoutThreadInput[] | AIAnalysisUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutThreadInput | AIAnalysisCreateOrConnectWithoutThreadInput[]
    createMany?: AIAnalysisCreateManyThreadInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutThreadsNestedInput = {
    create?: XOR<UserCreateWithoutThreadsInput, UserUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutThreadsInput
    upsert?: UserUpsertWithoutThreadsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutThreadsInput, UserUpdateWithoutThreadsInput>, UserUncheckedUpdateWithoutThreadsInput>
  }

  export type AccountUpdateOneRequiredWithoutThreadsNestedInput = {
    create?: XOR<AccountCreateWithoutThreadsInput, AccountUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThreadsInput
    upsert?: AccountUpsertWithoutThreadsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutThreadsInput, AccountUpdateWithoutThreadsInput>, AccountUncheckedUpdateWithoutThreadsInput>
  }

  export type EmailUpdateManyWithoutThreadNestedInput = {
    create?: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput> | EmailCreateWithoutThreadInput[] | EmailUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutThreadInput | EmailCreateOrConnectWithoutThreadInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutThreadInput | EmailUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: EmailCreateManyThreadInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutThreadInput | EmailUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutThreadInput | EmailUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUpdateManyWithoutThreadNestedInput = {
    create?: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput> | DraftCreateWithoutThreadInput[] | DraftUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutThreadInput | DraftCreateOrConnectWithoutThreadInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutThreadInput | DraftUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: DraftCreateManyThreadInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutThreadInput | DraftUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutThreadInput | DraftUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type AIAnalysisUpdateManyWithoutThreadNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput> | AIAnalysisCreateWithoutThreadInput[] | AIAnalysisUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutThreadInput | AIAnalysisCreateOrConnectWithoutThreadInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutThreadInput | AIAnalysisUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: AIAnalysisCreateManyThreadInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutThreadInput | AIAnalysisUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutThreadInput | AIAnalysisUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput> | EmailCreateWithoutThreadInput[] | EmailUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutThreadInput | EmailCreateOrConnectWithoutThreadInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutThreadInput | EmailUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: EmailCreateManyThreadInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutThreadInput | EmailUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutThreadInput | EmailUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type DraftUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput> | DraftCreateWithoutThreadInput[] | DraftUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: DraftCreateOrConnectWithoutThreadInput | DraftCreateOrConnectWithoutThreadInput[]
    upsert?: DraftUpsertWithWhereUniqueWithoutThreadInput | DraftUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: DraftCreateManyThreadInputEnvelope
    set?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    disconnect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    delete?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    connect?: DraftWhereUniqueInput | DraftWhereUniqueInput[]
    update?: DraftUpdateWithWhereUniqueWithoutThreadInput | DraftUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: DraftUpdateManyWithWhereWithoutThreadInput | DraftUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: DraftScalarWhereInput | DraftScalarWhereInput[]
  }

  export type AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput> | AIAnalysisCreateWithoutThreadInput[] | AIAnalysisUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutThreadInput | AIAnalysisCreateOrConnectWithoutThreadInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutThreadInput | AIAnalysisUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: AIAnalysisCreateManyThreadInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutThreadInput | AIAnalysisUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutThreadInput | AIAnalysisUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmailsInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    connect?: UserWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutEmailsInput = {
    create?: XOR<AccountCreateWithoutEmailsInput, AccountUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutEmailsInput
    connect?: AccountWhereUniqueInput
  }

  export type ThreadCreateNestedOneWithoutEmailsInput = {
    create?: XOR<ThreadCreateWithoutEmailsInput, ThreadUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutEmailsInput
    connect?: ThreadWhereUniqueInput
  }

  export type AttachmentCreateNestedManyWithoutEmailInput = {
    create?: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput> | AttachmentCreateWithoutEmailInput[] | AttachmentUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutEmailInput | AttachmentCreateOrConnectWithoutEmailInput[]
    createMany?: AttachmentCreateManyEmailInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type AIAnalysisCreateNestedManyWithoutEmailInput = {
    create?: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput> | AIAnalysisCreateWithoutEmailInput[] | AIAnalysisUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutEmailInput | AIAnalysisCreateOrConnectWithoutEmailInput[]
    createMany?: AIAnalysisCreateManyEmailInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput> | AttachmentCreateWithoutEmailInput[] | AttachmentUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutEmailInput | AttachmentCreateOrConnectWithoutEmailInput[]
    createMany?: AttachmentCreateManyEmailInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput> | AIAnalysisCreateWithoutEmailInput[] | AIAnalysisUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutEmailInput | AIAnalysisCreateOrConnectWithoutEmailInput[]
    createMany?: AIAnalysisCreateManyEmailInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    upsert?: UserUpsertWithoutEmailsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailsInput, UserUpdateWithoutEmailsInput>, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type AccountUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<AccountCreateWithoutEmailsInput, AccountUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutEmailsInput
    upsert?: AccountUpsertWithoutEmailsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutEmailsInput, AccountUpdateWithoutEmailsInput>, AccountUncheckedUpdateWithoutEmailsInput>
  }

  export type ThreadUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<ThreadCreateWithoutEmailsInput, ThreadUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutEmailsInput
    upsert?: ThreadUpsertWithoutEmailsInput
    connect?: ThreadWhereUniqueInput
    update?: XOR<XOR<ThreadUpdateToOneWithWhereWithoutEmailsInput, ThreadUpdateWithoutEmailsInput>, ThreadUncheckedUpdateWithoutEmailsInput>
  }

  export type AttachmentUpdateManyWithoutEmailNestedInput = {
    create?: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput> | AttachmentCreateWithoutEmailInput[] | AttachmentUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutEmailInput | AttachmentCreateOrConnectWithoutEmailInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutEmailInput | AttachmentUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: AttachmentCreateManyEmailInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutEmailInput | AttachmentUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutEmailInput | AttachmentUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type AIAnalysisUpdateManyWithoutEmailNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput> | AIAnalysisCreateWithoutEmailInput[] | AIAnalysisUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutEmailInput | AIAnalysisCreateOrConnectWithoutEmailInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutEmailInput | AIAnalysisUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: AIAnalysisCreateManyEmailInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutEmailInput | AIAnalysisUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutEmailInput | AIAnalysisUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput> | AttachmentCreateWithoutEmailInput[] | AttachmentUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutEmailInput | AttachmentCreateOrConnectWithoutEmailInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutEmailInput | AttachmentUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: AttachmentCreateManyEmailInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutEmailInput | AttachmentUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutEmailInput | AttachmentUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput> | AIAnalysisCreateWithoutEmailInput[] | AIAnalysisUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutEmailInput | AIAnalysisCreateOrConnectWithoutEmailInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutEmailInput | AIAnalysisUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: AIAnalysisCreateManyEmailInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutEmailInput | AIAnalysisUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutEmailInput | AIAnalysisUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmailAddressesInput = {
    create?: XOR<UserCreateWithoutEmailAddressesInput, UserUncheckedCreateWithoutEmailAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailAddressesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmailAddressesNestedInput = {
    create?: XOR<UserCreateWithoutEmailAddressesInput, UserUncheckedCreateWithoutEmailAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailAddressesInput
    upsert?: UserUpsertWithoutEmailAddressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailAddressesInput, UserUpdateWithoutEmailAddressesInput>, UserUncheckedUpdateWithoutEmailAddressesInput>
  }

  export type EmailCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<EmailCreateWithoutAttachmentsInput, EmailUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutAttachmentsInput
    connect?: EmailWhereUniqueInput
  }

  export type EmailUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<EmailCreateWithoutAttachmentsInput, EmailUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutAttachmentsInput
    upsert?: EmailUpsertWithoutAttachmentsInput
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutAttachmentsInput, EmailUpdateWithoutAttachmentsInput>, EmailUncheckedUpdateWithoutAttachmentsInput>
  }

  export type UserCreateNestedOneWithoutDraftsInput = {
    create?: XOR<UserCreateWithoutDraftsInput, UserUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDraftsInput
    connect?: UserWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutDraftsInput = {
    create?: XOR<AccountCreateWithoutDraftsInput, AccountUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutDraftsInput
    connect?: AccountWhereUniqueInput
  }

  export type ThreadCreateNestedOneWithoutDraftsInput = {
    create?: XOR<ThreadCreateWithoutDraftsInput, ThreadUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutDraftsInput
    connect?: ThreadWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDraftsNestedInput = {
    create?: XOR<UserCreateWithoutDraftsInput, UserUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDraftsInput
    upsert?: UserUpsertWithoutDraftsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDraftsInput, UserUpdateWithoutDraftsInput>, UserUncheckedUpdateWithoutDraftsInput>
  }

  export type AccountUpdateOneRequiredWithoutDraftsNestedInput = {
    create?: XOR<AccountCreateWithoutDraftsInput, AccountUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutDraftsInput
    upsert?: AccountUpsertWithoutDraftsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutDraftsInput, AccountUpdateWithoutDraftsInput>, AccountUncheckedUpdateWithoutDraftsInput>
  }

  export type ThreadUpdateOneWithoutDraftsNestedInput = {
    create?: XOR<ThreadCreateWithoutDraftsInput, ThreadUncheckedCreateWithoutDraftsInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutDraftsInput
    upsert?: ThreadUpsertWithoutDraftsInput
    disconnect?: ThreadWhereInput | boolean
    delete?: ThreadWhereInput | boolean
    connect?: ThreadWhereUniqueInput
    update?: XOR<XOR<ThreadUpdateToOneWithWhereWithoutDraftsInput, ThreadUpdateWithoutDraftsInput>, ThreadUncheckedUpdateWithoutDraftsInput>
  }

  export type UserCreateNestedOneWithoutAiAnalysesInput = {
    create?: XOR<UserCreateWithoutAiAnalysesInput, UserUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiAnalysesInput
    connect?: UserWhereUniqueInput
  }

  export type ThreadCreateNestedOneWithoutAiAnalysesInput = {
    create?: XOR<ThreadCreateWithoutAiAnalysesInput, ThreadUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutAiAnalysesInput
    connect?: ThreadWhereUniqueInput
  }

  export type EmailCreateNestedOneWithoutAiAnalysesInput = {
    create?: XOR<EmailCreateWithoutAiAnalysesInput, EmailUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: EmailCreateOrConnectWithoutAiAnalysesInput
    connect?: EmailWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAiAnalysesNestedInput = {
    create?: XOR<UserCreateWithoutAiAnalysesInput, UserUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiAnalysesInput
    upsert?: UserUpsertWithoutAiAnalysesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiAnalysesInput, UserUpdateWithoutAiAnalysesInput>, UserUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type ThreadUpdateOneWithoutAiAnalysesNestedInput = {
    create?: XOR<ThreadCreateWithoutAiAnalysesInput, ThreadUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutAiAnalysesInput
    upsert?: ThreadUpsertWithoutAiAnalysesInput
    disconnect?: ThreadWhereInput | boolean
    delete?: ThreadWhereInput | boolean
    connect?: ThreadWhereUniqueInput
    update?: XOR<XOR<ThreadUpdateToOneWithWhereWithoutAiAnalysesInput, ThreadUpdateWithoutAiAnalysesInput>, ThreadUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type EmailUpdateOneWithoutAiAnalysesNestedInput = {
    create?: XOR<EmailCreateWithoutAiAnalysesInput, EmailUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: EmailCreateOrConnectWithoutAiAnalysesInput
    upsert?: EmailUpsertWithoutAiAnalysesInput
    disconnect?: EmailWhereInput | boolean
    delete?: EmailWhereInput | boolean
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutAiAnalysesInput, EmailUpdateWithoutAiAnalysesInput>, EmailUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    threads?: ThreadCreateNestedManyWithoutAccountInput
    emails?: EmailCreateNestedManyWithoutAccountInput
    drafts?: DraftCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    threads?: ThreadUncheckedCreateNestedManyWithoutAccountInput
    emails?: EmailUncheckedCreateNestedManyWithoutAccountInput
    drafts?: DraftUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ThreadCreateWithoutUserInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutThreadsInput
    emails?: EmailCreateNestedManyWithoutThreadInput
    drafts?: DraftCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutThreadInput
    drafts?: DraftUncheckedCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutUserInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput>
  }

  export type ThreadCreateManyUserInputEnvelope = {
    data: ThreadCreateManyUserInput | ThreadCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailCreateWithoutUserInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutEmailsInput
    thread: ThreadCreateNestedOneWithoutEmailsInput
    attachments?: AttachmentCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutUserInput = {
    id: string
    threadId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutUserInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailCreateManyUserInputEnvelope = {
    data: EmailCreateManyUserInput | EmailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DraftCreateWithoutUserInput = {
    id: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutDraftsInput
    thread?: ThreadCreateNestedOneWithoutDraftsInput
  }

  export type DraftUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateOrConnectWithoutUserInput = {
    where: DraftWhereUniqueInput
    create: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput>
  }

  export type DraftCreateManyUserInputEnvelope = {
    data: DraftCreateManyUserInput | DraftCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailAddressCreateWithoutUserInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailAddressUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailAddressCreateOrConnectWithoutUserInput = {
    where: EmailAddressWhereUniqueInput
    create: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput>
  }

  export type EmailAddressCreateManyUserInputEnvelope = {
    data: EmailAddressCreateManyUserInput | EmailAddressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AIAnalysisCreateWithoutUserInput = {
    id?: string
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    thread?: ThreadCreateNestedOneWithoutAiAnalysesInput
    email?: EmailCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateWithoutUserInput = {
    id?: string
    threadId?: string | null
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateOrConnectWithoutUserInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput>
  }

  export type AIAnalysisCreateManyUserInputEnvelope = {
    data: AIAnalysisCreateManyUserInput | AIAnalysisCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    provider?: StringNullableFilter<"Account"> | string | null
    providerAccountId?: StringNullableFilter<"Account"> | string | null
    email?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    accessToken?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ThreadUpsertWithWhereUniqueWithoutUserInput = {
    where: ThreadWhereUniqueInput
    update: XOR<ThreadUpdateWithoutUserInput, ThreadUncheckedUpdateWithoutUserInput>
    create: XOR<ThreadCreateWithoutUserInput, ThreadUncheckedCreateWithoutUserInput>
  }

  export type ThreadUpdateWithWhereUniqueWithoutUserInput = {
    where: ThreadWhereUniqueInput
    data: XOR<ThreadUpdateWithoutUserInput, ThreadUncheckedUpdateWithoutUserInput>
  }

  export type ThreadUpdateManyWithWhereWithoutUserInput = {
    where: ThreadScalarWhereInput
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyWithoutUserInput>
  }

  export type ThreadScalarWhereInput = {
    AND?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
    OR?: ThreadScalarWhereInput[]
    NOT?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
    id?: StringFilter<"Thread"> | string
    userId?: StringFilter<"Thread"> | string
    accountId?: StringFilter<"Thread"> | string
    subject?: StringNullableFilter<"Thread"> | string | null
    lastMessageDate?: DateTimeNullableFilter<"Thread"> | Date | string | null
    snippet?: StringNullableFilter<"Thread"> | string | null
    unread?: BoolFilter<"Thread"> | boolean
    folder?: StringNullableFilter<"Thread"> | string | null
    messageCount?: IntFilter<"Thread"> | number
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
  }

  export type EmailUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
  }

  export type EmailUpdateManyWithWhereWithoutUserInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailScalarWhereInput = {
    AND?: EmailScalarWhereInput | EmailScalarWhereInput[]
    OR?: EmailScalarWhereInput[]
    NOT?: EmailScalarWhereInput | EmailScalarWhereInput[]
    id?: StringFilter<"Email"> | string
    threadId?: StringFilter<"Email"> | string
    userId?: StringFilter<"Email"> | string
    accountId?: StringFilter<"Email"> | string
    subject?: StringNullableFilter<"Email"> | string | null
    from?: JsonFilter<"Email">
    to?: JsonFilter<"Email">
    cc?: JsonNullableFilter<"Email">
    bcc?: JsonNullableFilter<"Email">
    replyTo?: JsonNullableFilter<"Email">
    sentAt?: DateTimeFilter<"Email"> | Date | string
    receivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    body?: StringNullableFilter<"Email"> | string | null
    bodySnippet?: StringNullableFilter<"Email"> | string | null
    sysClassifications?: JsonNullableFilter<"Email">
    keywords?: JsonNullableFilter<"Email">
    sysLabels?: JsonNullableFilter<"Email">
    folder?: StringNullableFilter<"Email"> | string | null
    isRead?: BoolFilter<"Email"> | boolean
    hasAttachments?: BoolFilter<"Email"> | boolean
    internetHeaders?: JsonNullableFilter<"Email">
    internetMessageId?: StringNullableFilter<"Email"> | string | null
    createdAt?: DateTimeFilter<"Email"> | Date | string
    updatedAt?: DateTimeFilter<"Email"> | Date | string
  }

  export type DraftUpsertWithWhereUniqueWithoutUserInput = {
    where: DraftWhereUniqueInput
    update: XOR<DraftUpdateWithoutUserInput, DraftUncheckedUpdateWithoutUserInput>
    create: XOR<DraftCreateWithoutUserInput, DraftUncheckedCreateWithoutUserInput>
  }

  export type DraftUpdateWithWhereUniqueWithoutUserInput = {
    where: DraftWhereUniqueInput
    data: XOR<DraftUpdateWithoutUserInput, DraftUncheckedUpdateWithoutUserInput>
  }

  export type DraftUpdateManyWithWhereWithoutUserInput = {
    where: DraftScalarWhereInput
    data: XOR<DraftUpdateManyMutationInput, DraftUncheckedUpdateManyWithoutUserInput>
  }

  export type DraftScalarWhereInput = {
    AND?: DraftScalarWhereInput | DraftScalarWhereInput[]
    OR?: DraftScalarWhereInput[]
    NOT?: DraftScalarWhereInput | DraftScalarWhereInput[]
    id?: StringFilter<"Draft"> | string
    userId?: StringFilter<"Draft"> | string
    accountId?: StringFilter<"Draft"> | string
    threadId?: StringNullableFilter<"Draft"> | string | null
    to?: JsonNullableFilter<"Draft">
    cc?: JsonNullableFilter<"Draft">
    bcc?: JsonNullableFilter<"Draft">
    subject?: StringNullableFilter<"Draft"> | string | null
    body?: StringNullableFilter<"Draft"> | string | null
    aiGenerated?: BoolFilter<"Draft"> | boolean
    tone?: StringNullableFilter<"Draft"> | string | null
    createdAt?: DateTimeFilter<"Draft"> | Date | string
    updatedAt?: DateTimeFilter<"Draft"> | Date | string
  }

  export type EmailAddressUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailAddressWhereUniqueInput
    update: XOR<EmailAddressUpdateWithoutUserInput, EmailAddressUncheckedUpdateWithoutUserInput>
    create: XOR<EmailAddressCreateWithoutUserInput, EmailAddressUncheckedCreateWithoutUserInput>
  }

  export type EmailAddressUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailAddressWhereUniqueInput
    data: XOR<EmailAddressUpdateWithoutUserInput, EmailAddressUncheckedUpdateWithoutUserInput>
  }

  export type EmailAddressUpdateManyWithWhereWithoutUserInput = {
    where: EmailAddressScalarWhereInput
    data: XOR<EmailAddressUpdateManyMutationInput, EmailAddressUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailAddressScalarWhereInput = {
    AND?: EmailAddressScalarWhereInput | EmailAddressScalarWhereInput[]
    OR?: EmailAddressScalarWhereInput[]
    NOT?: EmailAddressScalarWhereInput | EmailAddressScalarWhereInput[]
    id?: StringFilter<"EmailAddress"> | string
    name?: StringNullableFilter<"EmailAddress"> | string | null
    address?: StringFilter<"EmailAddress"> | string
    raw?: StringNullableFilter<"EmailAddress"> | string | null
    userId?: StringFilter<"EmailAddress"> | string
    createdAt?: DateTimeFilter<"EmailAddress"> | Date | string
    updatedAt?: DateTimeFilter<"EmailAddress"> | Date | string
  }

  export type AIAnalysisUpsertWithWhereUniqueWithoutUserInput = {
    where: AIAnalysisWhereUniqueInput
    update: XOR<AIAnalysisUpdateWithoutUserInput, AIAnalysisUncheckedUpdateWithoutUserInput>
    create: XOR<AIAnalysisCreateWithoutUserInput, AIAnalysisUncheckedCreateWithoutUserInput>
  }

  export type AIAnalysisUpdateWithWhereUniqueWithoutUserInput = {
    where: AIAnalysisWhereUniqueInput
    data: XOR<AIAnalysisUpdateWithoutUserInput, AIAnalysisUncheckedUpdateWithoutUserInput>
  }

  export type AIAnalysisUpdateManyWithWhereWithoutUserInput = {
    where: AIAnalysisScalarWhereInput
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyWithoutUserInput>
  }

  export type AIAnalysisScalarWhereInput = {
    AND?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    OR?: AIAnalysisScalarWhereInput[]
    NOT?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    userId?: StringFilter<"AIAnalysis"> | string
    threadId?: StringNullableFilter<"AIAnalysis"> | string | null
    emailId?: StringNullableFilter<"AIAnalysis"> | string | null
    type?: StringFilter<"AIAnalysis"> | string
    summary?: StringNullableFilter<"AIAnalysis"> | string | null
    metadata?: JsonNullableFilter<"AIAnalysis">
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"AIAnalysis"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    threads?: ThreadCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type ThreadCreateWithoutAccountInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThreadsInput
    emails?: EmailCreateNestedManyWithoutThreadInput
    drafts?: DraftCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutAccountInput = {
    id: string
    userId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutThreadInput
    drafts?: DraftUncheckedCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutAccountInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput>
  }

  export type ThreadCreateManyAccountInputEnvelope = {
    data: ThreadCreateManyAccountInput | ThreadCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type EmailCreateWithoutAccountInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
    thread: ThreadCreateNestedOneWithoutEmailsInput
    attachments?: AttachmentCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutAccountInput = {
    id: string
    threadId: string
    userId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutAccountInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput>
  }

  export type EmailCreateManyAccountInputEnvelope = {
    data: EmailCreateManyAccountInput | EmailCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type DraftCreateWithoutAccountInput = {
    id: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDraftsInput
    thread?: ThreadCreateNestedOneWithoutDraftsInput
  }

  export type DraftUncheckedCreateWithoutAccountInput = {
    id: string
    userId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateOrConnectWithoutAccountInput = {
    where: DraftWhereUniqueInput
    create: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput>
  }

  export type DraftCreateManyAccountInputEnvelope = {
    data: DraftCreateManyAccountInput | DraftCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    threads?: ThreadUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ThreadUpsertWithWhereUniqueWithoutAccountInput = {
    where: ThreadWhereUniqueInput
    update: XOR<ThreadUpdateWithoutAccountInput, ThreadUncheckedUpdateWithoutAccountInput>
    create: XOR<ThreadCreateWithoutAccountInput, ThreadUncheckedCreateWithoutAccountInput>
  }

  export type ThreadUpdateWithWhereUniqueWithoutAccountInput = {
    where: ThreadWhereUniqueInput
    data: XOR<ThreadUpdateWithoutAccountInput, ThreadUncheckedUpdateWithoutAccountInput>
  }

  export type ThreadUpdateManyWithWhereWithoutAccountInput = {
    where: ThreadScalarWhereInput
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyWithoutAccountInput>
  }

  export type EmailUpsertWithWhereUniqueWithoutAccountInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutAccountInput, EmailUncheckedUpdateWithoutAccountInput>
    create: XOR<EmailCreateWithoutAccountInput, EmailUncheckedCreateWithoutAccountInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutAccountInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutAccountInput, EmailUncheckedUpdateWithoutAccountInput>
  }

  export type EmailUpdateManyWithWhereWithoutAccountInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutAccountInput>
  }

  export type DraftUpsertWithWhereUniqueWithoutAccountInput = {
    where: DraftWhereUniqueInput
    update: XOR<DraftUpdateWithoutAccountInput, DraftUncheckedUpdateWithoutAccountInput>
    create: XOR<DraftCreateWithoutAccountInput, DraftUncheckedCreateWithoutAccountInput>
  }

  export type DraftUpdateWithWhereUniqueWithoutAccountInput = {
    where: DraftWhereUniqueInput
    data: XOR<DraftUpdateWithoutAccountInput, DraftUncheckedUpdateWithoutAccountInput>
  }

  export type DraftUpdateManyWithWhereWithoutAccountInput = {
    where: DraftScalarWhereInput
    data: XOR<DraftUpdateManyMutationInput, DraftUncheckedUpdateManyWithoutAccountInput>
  }

  export type UserCreateWithoutThreadsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutThreadsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutThreadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutThreadsInput, UserUncheckedCreateWithoutThreadsInput>
  }

  export type AccountCreateWithoutThreadsInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    emails?: EmailCreateNestedManyWithoutAccountInput
    drafts?: DraftCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutThreadsInput = {
    id: string
    userId: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutAccountInput
    drafts?: DraftUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutThreadsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutThreadsInput, AccountUncheckedCreateWithoutThreadsInput>
  }

  export type EmailCreateWithoutThreadInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
    account: AccountCreateNestedOneWithoutEmailsInput
    attachments?: AttachmentCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutThreadInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutEmailInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutThreadInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput>
  }

  export type EmailCreateManyThreadInputEnvelope = {
    data: EmailCreateManyThreadInput | EmailCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type DraftCreateWithoutThreadInput = {
    id: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDraftsInput
    account: AccountCreateNestedOneWithoutDraftsInput
  }

  export type DraftUncheckedCreateWithoutThreadInput = {
    id: string
    userId: string
    accountId: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateOrConnectWithoutThreadInput = {
    where: DraftWhereUniqueInput
    create: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput>
  }

  export type DraftCreateManyThreadInputEnvelope = {
    data: DraftCreateManyThreadInput | DraftCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type AIAnalysisCreateWithoutThreadInput = {
    id?: string
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiAnalysesInput
    email?: EmailCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateWithoutThreadInput = {
    id?: string
    userId: string
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateOrConnectWithoutThreadInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput>
  }

  export type AIAnalysisCreateManyThreadInputEnvelope = {
    data: AIAnalysisCreateManyThreadInput | AIAnalysisCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutThreadsInput = {
    update: XOR<UserUpdateWithoutThreadsInput, UserUncheckedUpdateWithoutThreadsInput>
    create: XOR<UserCreateWithoutThreadsInput, UserUncheckedCreateWithoutThreadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutThreadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutThreadsInput, UserUncheckedUpdateWithoutThreadsInput>
  }

  export type UserUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountUpsertWithoutThreadsInput = {
    update: XOR<AccountUpdateWithoutThreadsInput, AccountUncheckedUpdateWithoutThreadsInput>
    create: XOR<AccountCreateWithoutThreadsInput, AccountUncheckedCreateWithoutThreadsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutThreadsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutThreadsInput, AccountUncheckedUpdateWithoutThreadsInput>
  }

  export type AccountUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    emails?: EmailUpdateManyWithoutAccountNestedInput
    drafts?: DraftUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutAccountNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type EmailUpsertWithWhereUniqueWithoutThreadInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutThreadInput, EmailUncheckedUpdateWithoutThreadInput>
    create: XOR<EmailCreateWithoutThreadInput, EmailUncheckedCreateWithoutThreadInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutThreadInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutThreadInput, EmailUncheckedUpdateWithoutThreadInput>
  }

  export type EmailUpdateManyWithWhereWithoutThreadInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutThreadInput>
  }

  export type DraftUpsertWithWhereUniqueWithoutThreadInput = {
    where: DraftWhereUniqueInput
    update: XOR<DraftUpdateWithoutThreadInput, DraftUncheckedUpdateWithoutThreadInput>
    create: XOR<DraftCreateWithoutThreadInput, DraftUncheckedCreateWithoutThreadInput>
  }

  export type DraftUpdateWithWhereUniqueWithoutThreadInput = {
    where: DraftWhereUniqueInput
    data: XOR<DraftUpdateWithoutThreadInput, DraftUncheckedUpdateWithoutThreadInput>
  }

  export type DraftUpdateManyWithWhereWithoutThreadInput = {
    where: DraftScalarWhereInput
    data: XOR<DraftUpdateManyMutationInput, DraftUncheckedUpdateManyWithoutThreadInput>
  }

  export type AIAnalysisUpsertWithWhereUniqueWithoutThreadInput = {
    where: AIAnalysisWhereUniqueInput
    update: XOR<AIAnalysisUpdateWithoutThreadInput, AIAnalysisUncheckedUpdateWithoutThreadInput>
    create: XOR<AIAnalysisCreateWithoutThreadInput, AIAnalysisUncheckedCreateWithoutThreadInput>
  }

  export type AIAnalysisUpdateWithWhereUniqueWithoutThreadInput = {
    where: AIAnalysisWhereUniqueInput
    data: XOR<AIAnalysisUpdateWithoutThreadInput, AIAnalysisUncheckedUpdateWithoutThreadInput>
  }

  export type AIAnalysisUpdateManyWithWhereWithoutThreadInput = {
    where: AIAnalysisScalarWhereInput
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyWithoutThreadInput>
  }

  export type UserCreateWithoutEmailsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    threads?: ThreadCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
  }

  export type AccountCreateWithoutEmailsInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    threads?: ThreadCreateNestedManyWithoutAccountInput
    drafts?: DraftCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutEmailsInput = {
    id: string
    userId: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    threads?: ThreadUncheckedCreateNestedManyWithoutAccountInput
    drafts?: DraftUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutEmailsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutEmailsInput, AccountUncheckedCreateWithoutEmailsInput>
  }

  export type ThreadCreateWithoutEmailsInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThreadsInput
    account: AccountCreateNestedOneWithoutThreadsInput
    drafts?: DraftCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutEmailsInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    drafts?: DraftUncheckedCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutEmailsInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutEmailsInput, ThreadUncheckedCreateWithoutEmailsInput>
  }

  export type AttachmentCreateWithoutEmailInput = {
    id: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttachmentUncheckedCreateWithoutEmailInput = {
    id: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttachmentCreateOrConnectWithoutEmailInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput>
  }

  export type AttachmentCreateManyEmailInputEnvelope = {
    data: AttachmentCreateManyEmailInput | AttachmentCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type AIAnalysisCreateWithoutEmailInput = {
    id?: string
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAiAnalysesInput
    thread?: ThreadCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateWithoutEmailInput = {
    id?: string
    userId: string
    threadId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateOrConnectWithoutEmailInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput>
  }

  export type AIAnalysisCreateManyEmailInputEnvelope = {
    data: AIAnalysisCreateManyEmailInput | AIAnalysisCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEmailsInput = {
    update: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type UserUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    threads?: ThreadUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountUpsertWithoutEmailsInput = {
    update: XOR<AccountUpdateWithoutEmailsInput, AccountUncheckedUpdateWithoutEmailsInput>
    create: XOR<AccountCreateWithoutEmailsInput, AccountUncheckedCreateWithoutEmailsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutEmailsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutEmailsInput, AccountUncheckedUpdateWithoutEmailsInput>
  }

  export type AccountUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    threads?: ThreadUpdateManyWithoutAccountNestedInput
    drafts?: DraftUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUncheckedUpdateManyWithoutAccountNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type ThreadUpsertWithoutEmailsInput = {
    update: XOR<ThreadUpdateWithoutEmailsInput, ThreadUncheckedUpdateWithoutEmailsInput>
    create: XOR<ThreadCreateWithoutEmailsInput, ThreadUncheckedCreateWithoutEmailsInput>
    where?: ThreadWhereInput
  }

  export type ThreadUpdateToOneWithWhereWithoutEmailsInput = {
    where?: ThreadWhereInput
    data: XOR<ThreadUpdateWithoutEmailsInput, ThreadUncheckedUpdateWithoutEmailsInput>
  }

  export type ThreadUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThreadsNestedInput
    account?: AccountUpdateOneRequiredWithoutThreadsNestedInput
    drafts?: DraftUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    drafts?: DraftUncheckedUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type AttachmentUpsertWithWhereUniqueWithoutEmailInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutEmailInput, AttachmentUncheckedUpdateWithoutEmailInput>
    create: XOR<AttachmentCreateWithoutEmailInput, AttachmentUncheckedCreateWithoutEmailInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutEmailInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutEmailInput, AttachmentUncheckedUpdateWithoutEmailInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutEmailInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutEmailInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: StringFilter<"Attachment"> | string
    emailId?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    mimeType?: StringFilter<"Attachment"> | string
    size?: IntFilter<"Attachment"> | number
    contentId?: StringNullableFilter<"Attachment"> | string | null
    contentLocation?: StringNullableFilter<"Attachment"> | string | null
    isInline?: BoolFilter<"Attachment"> | boolean
    createdAt?: DateTimeFilter<"Attachment"> | Date | string
    updatedAt?: DateTimeFilter<"Attachment"> | Date | string
  }

  export type AIAnalysisUpsertWithWhereUniqueWithoutEmailInput = {
    where: AIAnalysisWhereUniqueInput
    update: XOR<AIAnalysisUpdateWithoutEmailInput, AIAnalysisUncheckedUpdateWithoutEmailInput>
    create: XOR<AIAnalysisCreateWithoutEmailInput, AIAnalysisUncheckedCreateWithoutEmailInput>
  }

  export type AIAnalysisUpdateWithWhereUniqueWithoutEmailInput = {
    where: AIAnalysisWhereUniqueInput
    data: XOR<AIAnalysisUpdateWithoutEmailInput, AIAnalysisUncheckedUpdateWithoutEmailInput>
  }

  export type AIAnalysisUpdateManyWithWhereWithoutEmailInput = {
    where: AIAnalysisScalarWhereInput
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyWithoutEmailInput>
  }

  export type UserCreateWithoutEmailAddressesInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    threads?: ThreadCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailAddressesInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailAddressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailAddressesInput, UserUncheckedCreateWithoutEmailAddressesInput>
  }

  export type UserUpsertWithoutEmailAddressesInput = {
    update: XOR<UserUpdateWithoutEmailAddressesInput, UserUncheckedUpdateWithoutEmailAddressesInput>
    create: XOR<UserCreateWithoutEmailAddressesInput, UserUncheckedCreateWithoutEmailAddressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailAddressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailAddressesInput, UserUncheckedUpdateWithoutEmailAddressesInput>
  }

  export type UserUpdateWithoutEmailAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    threads?: ThreadUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmailCreateWithoutAttachmentsInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
    account: AccountCreateNestedOneWithoutEmailsInput
    thread: ThreadCreateNestedOneWithoutEmailsInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutAttachmentsInput = {
    id: string
    threadId: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutAttachmentsInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutAttachmentsInput, EmailUncheckedCreateWithoutAttachmentsInput>
  }

  export type EmailUpsertWithoutAttachmentsInput = {
    update: XOR<EmailUpdateWithoutAttachmentsInput, EmailUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<EmailCreateWithoutAttachmentsInput, EmailUncheckedCreateWithoutAttachmentsInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutAttachmentsInput, EmailUncheckedUpdateWithoutAttachmentsInput>
  }

  export type EmailUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
    account?: AccountUpdateOneRequiredWithoutEmailsNestedInput
    thread?: ThreadUpdateOneRequiredWithoutEmailsNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type UserCreateWithoutDraftsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    threads?: ThreadCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDraftsInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDraftsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDraftsInput, UserUncheckedCreateWithoutDraftsInput>
  }

  export type AccountCreateWithoutDraftsInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
    threads?: ThreadCreateNestedManyWithoutAccountInput
    emails?: EmailCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutDraftsInput = {
    id: string
    userId: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    threads?: ThreadUncheckedCreateNestedManyWithoutAccountInput
    emails?: EmailUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutDraftsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutDraftsInput, AccountUncheckedCreateWithoutDraftsInput>
  }

  export type ThreadCreateWithoutDraftsInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThreadsInput
    account: AccountCreateNestedOneWithoutThreadsInput
    emails?: EmailCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutDraftsInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutThreadInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutDraftsInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutDraftsInput, ThreadUncheckedCreateWithoutDraftsInput>
  }

  export type UserUpsertWithoutDraftsInput = {
    update: XOR<UserUpdateWithoutDraftsInput, UserUncheckedUpdateWithoutDraftsInput>
    create: XOR<UserCreateWithoutDraftsInput, UserUncheckedCreateWithoutDraftsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDraftsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDraftsInput, UserUncheckedUpdateWithoutDraftsInput>
  }

  export type UserUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    threads?: ThreadUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountUpsertWithoutDraftsInput = {
    update: XOR<AccountUpdateWithoutDraftsInput, AccountUncheckedUpdateWithoutDraftsInput>
    create: XOR<AccountCreateWithoutDraftsInput, AccountUncheckedCreateWithoutDraftsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutDraftsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutDraftsInput, AccountUncheckedUpdateWithoutDraftsInput>
  }

  export type AccountUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    threads?: ThreadUpdateManyWithoutAccountNestedInput
    emails?: EmailUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUncheckedUpdateManyWithoutAccountNestedInput
    emails?: EmailUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type ThreadUpsertWithoutDraftsInput = {
    update: XOR<ThreadUpdateWithoutDraftsInput, ThreadUncheckedUpdateWithoutDraftsInput>
    create: XOR<ThreadCreateWithoutDraftsInput, ThreadUncheckedCreateWithoutDraftsInput>
    where?: ThreadWhereInput
  }

  export type ThreadUpdateToOneWithWhereWithoutDraftsInput = {
    where?: ThreadWhereInput
    data: XOR<ThreadUpdateWithoutDraftsInput, ThreadUncheckedUpdateWithoutDraftsInput>
  }

  export type ThreadUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThreadsNestedInput
    account?: AccountUpdateOneRequiredWithoutThreadsNestedInput
    emails?: EmailUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutDraftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type UserCreateWithoutAiAnalysesInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    threads?: ThreadCreateNestedManyWithoutUserInput
    emails?: EmailCreateNestedManyWithoutUserInput
    drafts?: DraftCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiAnalysesInput = {
    id: string
    firstname: string
    lastname: string
    time?: Date | string
    email: string
    imageURL: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    threads?: ThreadUncheckedCreateNestedManyWithoutUserInput
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    drafts?: DraftUncheckedCreateNestedManyWithoutUserInput
    emailAddresses?: EmailAddressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiAnalysesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiAnalysesInput, UserUncheckedCreateWithoutAiAnalysesInput>
  }

  export type ThreadCreateWithoutAiAnalysesInput = {
    id: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutThreadsInput
    account: AccountCreateNestedOneWithoutThreadsInput
    emails?: EmailCreateNestedManyWithoutThreadInput
    drafts?: DraftCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutAiAnalysesInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailUncheckedCreateNestedManyWithoutThreadInput
    drafts?: DraftUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutAiAnalysesInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutAiAnalysesInput, ThreadUncheckedCreateWithoutAiAnalysesInput>
  }

  export type EmailCreateWithoutAiAnalysesInput = {
    id: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmailsInput
    account: AccountCreateNestedOneWithoutEmailsInput
    thread: ThreadCreateNestedOneWithoutEmailsInput
    attachments?: AttachmentCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutAiAnalysesInput = {
    id: string
    threadId: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutAiAnalysesInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutAiAnalysesInput, EmailUncheckedCreateWithoutAiAnalysesInput>
  }

  export type UserUpsertWithoutAiAnalysesInput = {
    update: XOR<UserUpdateWithoutAiAnalysesInput, UserUncheckedUpdateWithoutAiAnalysesInput>
    create: XOR<UserCreateWithoutAiAnalysesInput, UserUncheckedCreateWithoutAiAnalysesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiAnalysesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiAnalysesInput, UserUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type UserUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    threads?: ThreadUpdateManyWithoutUserNestedInput
    emails?: EmailUpdateManyWithoutUserNestedInput
    drafts?: DraftUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    imageURL?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutUserNestedInput
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutUserNestedInput
    emailAddresses?: EmailAddressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ThreadUpsertWithoutAiAnalysesInput = {
    update: XOR<ThreadUpdateWithoutAiAnalysesInput, ThreadUncheckedUpdateWithoutAiAnalysesInput>
    create: XOR<ThreadCreateWithoutAiAnalysesInput, ThreadUncheckedCreateWithoutAiAnalysesInput>
    where?: ThreadWhereInput
  }

  export type ThreadUpdateToOneWithWhereWithoutAiAnalysesInput = {
    where?: ThreadWhereInput
    data: XOR<ThreadUpdateWithoutAiAnalysesInput, ThreadUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type ThreadUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThreadsNestedInput
    account?: AccountUpdateOneRequiredWithoutThreadsNestedInput
    emails?: EmailUpdateManyWithoutThreadNestedInput
    drafts?: DraftUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutThreadNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type EmailUpsertWithoutAiAnalysesInput = {
    update: XOR<EmailUpdateWithoutAiAnalysesInput, EmailUncheckedUpdateWithoutAiAnalysesInput>
    create: XOR<EmailCreateWithoutAiAnalysesInput, EmailUncheckedCreateWithoutAiAnalysesInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutAiAnalysesInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutAiAnalysesInput, EmailUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type EmailUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
    account?: AccountUpdateOneRequiredWithoutEmailsNestedInput
    thread?: ThreadUpdateOneRequiredWithoutEmailsNestedInput
    attachments?: AttachmentUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type AccountCreateManyUserInput = {
    id: string
    provider?: string | null
    providerAccountId?: string | null
    email: string
    name: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ThreadCreateManyUserInput = {
    id: string
    accountId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCreateManyUserInput = {
    id: string
    threadId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateManyUserInput = {
    id: string
    accountId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailAddressCreateManyUserInput = {
    id?: string
    name?: string | null
    address: string
    raw?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateManyUserInput = {
    id?: string
    threadId?: string | null
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUpdateManyWithoutAccountNestedInput
    emails?: EmailUpdateManyWithoutAccountNestedInput
    drafts?: DraftUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUncheckedUpdateManyWithoutAccountNestedInput
    emails?: EmailUncheckedUpdateManyWithoutAccountNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutThreadsNestedInput
    emails?: EmailUpdateManyWithoutThreadNestedInput
    drafts?: DraftUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutThreadNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutEmailsNestedInput
    thread?: ThreadUpdateOneRequiredWithoutEmailsNestedInput
    attachments?: AttachmentUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutDraftsNestedInput
    thread?: ThreadUpdateOneWithoutDraftsNestedInput
  }

  export type DraftUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailAddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    raw?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: ThreadUpdateOneWithoutAiAnalysesNestedInput
    email?: EmailUpdateOneWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCreateManyAccountInput = {
    id: string
    userId: string
    subject?: string | null
    lastMessageDate?: Date | string | null
    snippet?: string | null
    unread?: boolean
    folder?: string | null
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCreateManyAccountInput = {
    id: string
    threadId: string
    userId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateManyAccountInput = {
    id: string
    userId: string
    threadId?: string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ThreadUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutThreadsNestedInput
    emails?: EmailUpdateManyWithoutThreadNestedInput
    drafts?: DraftUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailUncheckedUpdateManyWithoutThreadNestedInput
    drafts?: DraftUncheckedUpdateManyWithoutThreadNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessageDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snippet?: NullableStringFieldUpdateOperationsInput | string | null
    unread?: BoolFieldUpdateOperationsInput | boolean
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
    thread?: ThreadUpdateOneRequiredWithoutEmailsNestedInput
    attachments?: AttachmentUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDraftsNestedInput
    thread?: ThreadUpdateOneWithoutDraftsNestedInput
  }

  export type DraftUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCreateManyThreadInput = {
    id: string
    userId: string
    accountId: string
    subject?: string | null
    from: JsonNullValueInput | InputJsonValue
    to: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt: Date | string
    receivedAt?: Date | string | null
    body?: string | null
    bodySnippet?: string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: string | null
    isRead?: boolean
    hasAttachments?: boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DraftCreateManyThreadInput = {
    id: string
    userId: string
    accountId: string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: string | null
    body?: string | null
    aiGenerated?: boolean
    tone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateManyThreadInput = {
    id?: string
    userId: string
    emailId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
    account?: AccountUpdateOneRequiredWithoutEmailsNestedInput
    attachments?: AttachmentUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutEmailNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    from?: JsonNullValueInput | InputJsonValue
    to?: JsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    replyTo?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    bodySnippet?: NullableStringFieldUpdateOperationsInput | string | null
    sysClassifications?: NullableJsonNullValueInput | InputJsonValue
    keywords?: NullableJsonNullValueInput | InputJsonValue
    sysLabels?: NullableJsonNullValueInput | InputJsonValue
    folder?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    hasAttachments?: BoolFieldUpdateOperationsInput | boolean
    internetHeaders?: NullableJsonNullValueInput | InputJsonValue
    internetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDraftsNestedInput
    account?: AccountUpdateOneRequiredWithoutDraftsNestedInput
  }

  export type DraftUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DraftUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    to?: NullableJsonNullValueInput | InputJsonValue
    cc?: NullableJsonNullValueInput | InputJsonValue
    bcc?: NullableJsonNullValueInput | InputJsonValue
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    aiGenerated?: BoolFieldUpdateOperationsInput | boolean
    tone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiAnalysesNestedInput
    email?: EmailUpdateOneWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateManyEmailInput = {
    id: string
    filename: string
    mimeType: string
    size: number
    contentId?: string | null
    contentLocation?: string | null
    isInline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAnalysisCreateManyEmailInput = {
    id?: string
    userId: string
    threadId?: string | null
    type: string
    summary?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttachmentUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    contentId?: NullableStringFieldUpdateOperationsInput | string | null
    contentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    isInline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiAnalysesNestedInput
    thread?: ThreadUpdateOneWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    threadId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}