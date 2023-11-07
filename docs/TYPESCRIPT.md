
# Orbitdb typescript definitions

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Orbitdb typescript definitions](#orbitdb-typescript-definitions)
  - [Install](#install)
  - [Why are types are manually written?](#why-are-types-are-manually-written)
  - [Usage](#usage)
    - [Disclaimer: Data safety in typescript](#disclaimer-data-safety-in-typescript)
    - [Untyped vs Typed databases](#untyped-vs-typed-databases)
    - [Opening/Creating databases](#openingcreating-databases)
      - [`type` parameter](#type-parameter)
      - [Open an existing database by address](#open-an-existing-database-by-address)
      - [Events](#events)
      - [Documents](#documents)
      - [KeyValue](#keyvalue)

<!-- /code_chunk_output -->

## Install

Orbitdb typescript definitions are bundled with orbitdb starting from version 1.0.1. No extra steps required.

## Why are types are manually written?

Orbitdb is written in pure Javascript, and although it contains JSDoc with type annotations, they are not well typed and have issues since their intended use is to provide documentation for the generated [API website](http://api.orbitdb.org). Since generating typescript definitions from the JSDoc was not a valid option, it was decided to mantain manual definitions, since the alternative would be to migrate the source code to typescript, or redo the API website.

> For more information see [this PR](https://github.com/orbitdb/orbitdb/pull/1106)

Thare are some implications that stem from this decision, mainly being that the definitions are not automatically generated from the source code, which could possibly result in the definitions becoming incomplete or incompatible whenever the API changes.

If you find any issues with the definitions, please open an issue or a PR implementing the fix.

## Usage

Usage stays mostly the same as with javascript, although there are some caveats. Since orbitdb 1.0 the main way to retrieve or create a database is to call `open` on the orbitdb instance. This function provides an options argument that allows to specify the type of the database by using the `type` field, which accepts a string database type identifier ("documents", "keyvalue", "events").

The typescript orbitdb definitions force the use of the field `Database` which only accepts a valid database type. This makes the use more verbose, but it is necessary to provide type information to the compiler as well as to enforce correct API usage.

Using other methods to create or retrieve a database may result in unkown or undesired behaviour.
Do use the following examples as guides for usage.

### Disclaimer: Data safety in typescript

The compiler can only check if the data you put into the database matches the shape you described, but it cannot guarantee that the data already in the database or received from other peers has the same shape. You can even "trick" the compiler to force it to feed it the data with double assertions (`data as unknown as T`, `T` being whatever you want the compiler to think the database holds).

You can even create a database of `Event<number>`, close it and reopen the same database but giving the open function the typing `Event<string>` and TS will not complain.

This is obvious since **there are no runtime checks for data validation which is expected behaviour**. This kind of type assertions can be tricky since they are neither _real_ nor checked, and can give a "false sense of security".

If you want compile and runtime validation see [@julienmalard](https://github.com/julienmalard)'s reseau-constellation [Bohr-DB](https://github.com/reseau-constellation/bohr-db) project:
> "Bohr-DB brings both TypeScript and runtime-checked types to your orbit-db databases, so that you can be sure that you'll only receive values that correspond to your specified data schema.
>
> Borh-DB uses AJV to check for data validity behind the scenes. It wraps around existing orbit-db databases with a proxy, so you can use typed Borh-DB databases as a drop-in and type-safe replacement for the original orbit-db databases in your code."

### Untyped vs Typed databases

When opening a database if no type information is provided the database will be typed as `unknown`.

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

This means that all operations on the database will deal with unknown data. Meaning that using the `as` operator becomes necessary which defeats the whole purpose of using typescript.

This is valid but not the recommended way to use orbitdb with typescript.

See the [orbitdb definition](https://github.com/orbitdb/orbitdb/tree/main/types/orbitdb.d.ts) for more information.

### Opening/Creating databases

By default, OrbitDB will create a database of type [Events](https://github.com/orbitdb/orbitdb/tree/main/types/databases/events.d.ts). This typings package forces the use of the Database type parameter to be specified. Refer to the functions that create a database:

- [Documents](https://github.com/orbitdb/orbitdb/tree/main/types/databases/documents.d.ts)
- [Events](https://github.com/orbitdb/orbitdb/tree/main/types/databases/events.d.ts)
- [KeyValue](https://github.com/orbitdb/orbitdb/tree/main/types/databases/keyvalue.d.ts)

#### `type` parameter

This makes the parameter `type` obsolete. It can still be used but type restraints will be enforced. Hence using

```ts
 const mydb = await orbitdb.open('mydb', {type: 'documents', Database: Events<string>()})
 ```

> Type '"documents"' is not assignable to type '"events"'.
>I was expecting a type matching "events", but instead you passed "documents".
>(property) type?: "events" | undefined

The type must be listed in [DatabaseTypes](https://github.com/orbitdb/orbitdb/tree/main/types/databases/index.d.ts) or an error is thrown.

#### Open an existing database by address

 To open an existing database, pass its address to the `open` function:

```ts
 const existingDB = await orbitdb.open(dbAddress)
 console.log(existingDB.address) // prints /orbitdb/zdpuAkstgbTVGHQmMi5TC84auhJ8rL5qoaNEtXo2d5PHXs2To
 const mydb: Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>
 ```

 When using this options parameters `type` and `Database` are not available.
TypeScript doesn't know the type of database being opened. To specify it use the generic type parameter:

 ```ts
 const existingDB = await orbitdb.open<Events<string>>(dbAddress)
 console.log(existingDB.address) // same address /orbitdb/zdpuAkstgbTVGHQmMi5TC84auhJ8rL5qoaNEtXo2d5PHXs2To
 const existingDB : Events<string> // we have narrowed down the type by using the generic type parameter
```

#### Events

```ts
 import { Events } from '@orbitdb/core'
 const mydb = await orbitdb.open('mydb', {Database: Events<string>()})
```

```ts
 const mydb : Events<string>
 ```

Trying to store anything of type than string will result in a type error.

```ts
await mydb.add(1)
 // Argument of type 'number' is not assignable to parameter of type 'string'.
 ```

 Retreiving data from the database will result in the correct data type the databse holds.

```ts
const hash = await mydb.add("hello")
const entry = await mydb.get(hash)
```

```ts
const entry : string
```

#### Documents

A document is a structured record that contains information or data, often represented in different formats. In this case we can use a typescript interface or object type that describes the document.

 ```ts
 import { documents } from '@orbitdb/core'
 interface User {
  name: string
  age: number
 } // this is the same as type User = {name: string, age: number}
 const db = await orbitdb.Documents<User>("users")
 ```

 This results on `mydb` being of type:

```ts
const db :  
```

A document database has to type parameters:

1. The document
2. The index key

#### KeyValue
