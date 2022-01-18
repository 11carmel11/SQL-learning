# What is ORM
Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. \ 
When talking about ORM, most people are referring to a library that implements the Object-Relational Mapping technique, hence the phrase "an ORM".


# Why ORM is Needed (Mainly DRY)
At a very high level: ORMs help to reduce the Object-Relational impedance mismatch. \ 
They allow you to store and retrieve full live objects from a relational database without doing a lot of parsing/serialization yourself.

**PROS:** 
* DRY: You write your data model in only one place, and it's easier to update, maintain, and reuse the code.
* A lot of stuff is done automatically, from database handling to I18N.
* It forces you to write MVC code, which, in the end, makes your code a little cleaner.
* You don't have to write poorly-formed SQL
* Sanitizing; using prepared statements or transactions are as easy as calling a method.
* It fits in your natural way of coding (it's your language!).
* It abstracts the DB system, so you can change it whenever you want.
* The model is weakly bound to the rest of the application, so you can change it or use it anywhere else.
* Cache Management — Entities are cached in memory thereby reducing load on the DB.


**CONS:**
* You have to learn it, and ORM libraries are not lightweight tools;
* You have to set it up.
* **Performance is OK for usual queries, but a SQL master will always do better with his own SQL for big projects.**
* It abstracts the DB. While it's OK if you know what's happening behind the scene, it's a trap for new programmers that can write very greedy statements, like a heavy hit in a for loop.
* Increased startup time due to metadata preparation

# ORM Benchmark
[TypeScript ORM Benchmarks](https://github.com/emanuelcasco/typescript-orm-benchmark)

### Resources
[Four Sequelize Associations You Should Know](https://javascript.plainenglish.io/four-sequelize-associations-you-should-know-415d8d413e1e) \
[Stackoverflow: What is an ORM, how does it work, and how should I use one?](https://stackoverflow.com/a/1279678)

### Assignment
[Fullstackopen part no. 13](https://fullstackopen.com/en/part13)
