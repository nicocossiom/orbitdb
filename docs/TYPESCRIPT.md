
# OrbitDB Typescript definitions

<!--toc:start-->
- [OrbitDB Typescript definitions](#orbitdb-typescript-definitions)
  - [Install](#install)
  - [Why are the typing definitions manually written?](#why-are-the-typing-definitions-manually-written)
  - [Usage](#usage)
    - [Disclaimer: Data safety in Typescript](#disclaimer-data-safety-in-typescript)
    - [Untyped vs typed databases](#untyped-vs-typed-databases)
    - [Opening/Creating databases](#openingcreating-databases)
      - [`type` parameter](#type-parameter)
      - [Open an existing database by address](#open-an-existing-database-by-address)
      - [Open/Create a database by name and database type](#opencreate-a-database-by-name-and-database-type)
      - [Events](#events)
      - [Documents](#documents)
      - [KeyValue](#keyvalue)
  - [Testing](#testing)
<!--toc:end-->

## Install

OrbitDB Typescript definitions are bundled with OrbitDB starting from version 1.0.1.
No extra steps required.

## Why are the typing definitions manually written?

OrbitDB is written in Javascript, and although it contains JSDoc with type annotations,
they are not well typed and have issues since their intended use is to provide documentation
for the generated [API website](http://api.OrbitDB.org).
Using JSDoc to generate TypeScript definitions was deemed impractical as it would
require extensive modifications to both the API website and the definitions.
Consequently, the decision was made to continue with manual definitions to avoid
the complexities of either migrating the source code to TypeScript or overhauling
the API website.

> For more information see [this PR](https://github.com/orbitdb/orbitdb/pull/1106)

There are some implications that stem from this decision, mainly being that the
definitions are not automatically generated from the source code, which could
possibly result in the definitions becoming incomplete or incompatible whenever
the API changes.

If you find any issues with the definitions, please open an issue or a PR
implementing the fix.

## Usage

Usage stays mostly the same as with Javascript, although there are some caveats.
Since OrbitDB 1.0 the main way to retrieve or create a database is to call `open`
on the OrbitDB instance. This function provides an options argument that allows
to specify the type of the database by using the `type` field, which accepts a
string database type identifier ("documents", "keyvalue", "events").

The Typescript OrbitDB definitions force the use of the field `Database` which
only accepts a valid database instance type. This makes the use more verbose,
but it is necessary to provide type information to the compiler as well as to
enforce correct API usage.

>Using other methods to create or retrieve a database may result in unknown or
undesired behaviour. Do use the following examples as guides for usage.

### Disclaimer: Data safety in Typescript

Typescript's compiler can only check if the data you put into the database matches
the shape you described, but it cannot guarantee that the data already in the
database or received from other peers has the same shape. It is possible to _trick_
the compiler to force it and force it to feed _invalid data_ with double assertions
(`data as unknown as T`, `T` being whatever you want the compiler to think the
database holds).

It's even possible to create a database of `Event<number>`, close it and reopen
the same database but giving the open function the typing `Event<string>` and TS
will not complain.

This is obvious since **there are no runtime checks for data validation which
is expected behaviour**. This kind of type assertions can be tricky since they
are neither _real_ nor checked, and can give a "false sense of security".

If you want compile and runtime validation check out [Bohr-DB](https://github.com/reseau-constellation/bohr-db)
by [@julienmalard](https://github.com/julienmalard's):

>"Bohr-DB brings both Typescript and runtime-checked types to your orbit-db
databases, so that you can be sure that you'll only receive values that correspond
to your specified data schema.

<!---->
>"Bohr-DB uses AJV to check for data validity behind the scenes. It wraps around
existing orbit-db databases with a proxy, so you can use typed Bohr-DB databases
as a drop-in and type-safe replacement for the original orbit-db databases in
your code."

### Untyped vs typed databases

When opening a database if no type information is provided the database will be
typed as `unknown`.

```ts
import {createOrbitDB, Events } from "@orbitdb/core"
import { createIPFS } from "ipfs-core"

const ipfs = await createIPFS()
const orbitdb = await createOrbitDB({ ipfs: ipfs })
const eventlog = await orbitdb.open("myeventlog", { Database: Events() })
```

The eventlog is of type:

```ts
const eventlog: EventLog<unknown>
```

This means that all operations on the database will deal with unknown data.
Meaning that using the `as` operator becomes necessary as Typescript will complain
when trying to use the data at any point as it doesn't know its
type. This defeats the whole purpose of using Typescript in the first place.

This is valid but not the recommended way to use OrbitDB with Typescript.

See the [OrbitDB definition](../types/OrbitDB.d.ts) for more information.

### Opening/Creating databases

By default, OrbitDB will create a database of type [Events](../types/databases/events.d.ts).
This typings package forces the use of the Database type parameter to be specified.
Refer to the functions that create a database:

- [Documents](../types/databases/documents.d.ts)
- [Events](../types/databases/events.d.ts)
- [KeyValue](../types/databases/keyvalue.d.ts)

#### `type` parameter

This makes the parameter `type` obsolete. It can still be used but type restraints
will be enforced. Hence using

```ts
 const mydb = await orbitdb.open('mydb', {type: 'documents', Database: Events<string>()})
 ```

> Type '"documents"' is not assignable to type '"events"'.
>I was expecting a type matching "events", but instead you passed "documents".
>(property) type?: "events" | undefined

The type must be listed in [DatabaseTypes](../types/databases/index.d.ts) or an
error is thrown.

#### Open an existing database by address

 To open an existing database, pass its address to the `open` function:

```ts
 const existingDB = await orbitdb.open(dbAddress)
 console.log(existingDB.address) // prints /orbitdb/zdpuAkstgbTVGHQmMi5TC84auhJ8rL5qoaNEtXo2d5PHXs2To
 const mydb: Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>
 ```

 When using this options parameters `type` and `Database` are not available.
Typescript doesn't know the type of database being opened. To specify it use the
generic type parameter:

 ```ts
 const existingDB = await orbitdb.open<Events<string>>(dbAddress)
 console.log(existingDB.address) // same address /orbitdb/zdpuAkstgbTVGHQmMi5TC84auhJ8rL5qoaNEtXo2d5PHXs2To
 const existingDB : Events<string>
````

We have narrowed down the type by using the generic type parameter

#### Open/Create a database by name and database type

As specified before, the `Database` field of the second argument must be a function
that returns the desired database type.
This functions accept generic arguments that specify the type of the values inside
the database.

#### Events

```ts
 import { Events } from '@orbitdb/core'
 const mydb = await orbitdb.open('mydb', {Database: Events<string>()})
 const mydb : Events<string>
```

Trying to store anything with a different type other than `string` will result
in a type error.

```ts
await mydb.add(1)
 // Argument of type 'number' is not assignable to parameter of type 'string'.
 ```

Retrieving data from the database will result in the correct data type the
database holds.

```ts
const hash = await mydb.add("hello")
const entry = await mydb.get(hash)
const entry : string
```

#### Documents

A document is a structured record that contains information or data, often represented
in different formats. In this case we can use a Typescript interface or object
type that describes the document.

 ```ts
 interface User {
  name: string
  age: number
 } // this is the same as type User = {name: string, age: number}
 const db = await orbitdb.open("users", {Database: Documents<User>()})
 const db : Documents<User, "_id">
 ```

A document database has to type parameters:

1. The document type, in this case `User`.
2. The index field, which by default is `_id` (hidden internally).

If the database is to be indexed by a different field, it can be specified
like the following:

 ```ts
 interface User {
  name: string
  age: number
 } // this is the same as type User = {name: string, age: number}
 const db = await orbitdb.open("users", 
   {
     Database: Documents<User, "name">({indexBy: "name"})
   })
 const db : Documents<User, "name">
 ```

This might seem complicated, but the index field is constrained as a `keyof T`,
`T` being the document type. This means that the index field must be a valid field
of T, hence type safety is guaranteed as well as getting suggestions from your IDE.

If you do provide the index generic, then you will be forced to use the `indexBy`
parameter field in the `Documents` function, which will autocomplete to the field
you specified (which has to be valid, else Typescript will complain).

The downside is that this also works the other way around, if you provide the `indexBy`
parameter, then you will be forced to provide the index generic.

 ```ts
 const db = await this.orbitdb.open("test", 
   { 
     Database: Documents<User>({ indexBy: "name" }) 
   }) // Expected 0 arguments, but got 1.
```

This is because the `Documents` function definition has been overloaded to accept
either one or two generic type parameters. See the [definition](../types/databases/documents.d.ts)
for more information. Also, if you find there are better approaches to this problem,
please open an issue or PR.

#### KeyValue

As with other databases it is possible to create a `KeyValue` database of
unknown types:

```ts
const db = await orbitdb.open("test", {Database: KeyValue()})
const db: KeyValue<unknown, unknown>
```

## Testing

Tests for Typescript definitions are provided inside of the
[test](../test/types/types.test.ts) folder.
