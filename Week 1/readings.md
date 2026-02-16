# Week 1

## Why let?
Throughout the code you will see variables declared 2 different ways.
```
let someValue = 3;
const BIG_NUMBER = 7;
```

You probably recognise `const`, it's a variable that can't be changed once it's been assigned. For variables that are expected to change, we can use `let` or `var`. `var` is the OG, you will see it a lot if you consume any amount of Javascript content; but it's gone out of favour due to a quirky issue called `hoisting`. `let` is the equivalent of `var`, just without this issue; so I recommend you use it instead of `var` to avoid some unexpected results.

Useful Resources:
 - [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
 - [100+ JavaScript Concepts you Need to Know](https://youtu.be/lkIFF4maKMU?si=no8Szb7U_w7VoJLt&t=192)
   - This whole video is great if this subject is your first time writing Javascript

## Naming convention
Keeping the naming scheme of your variables and functions consistent is important. Mainly so you don't annoy other people working on the same codebase; but secondarily, so you don't annoy yourself <sup>(trust me)</sup>. Javascript doesn't have an _absolute_ standard, but the standard you will see in these demos is as follows:
 - Variables: **camelCase**
 - Function declarations: **camelCase**
 - Constant and global variables: **UPPER_SNAKE_CASE**
   (This is for variables that are _both_ constant and in global scope; not 2 independent items)

> [!NOTE]
> This isn't assessed in this subject. But it is beneficial to get into the habit of a consistent naming convention.

## Project Structure
This is another thing that doesn't really have a concrete standard. In fact, a lot of people just put the entirety of their threejs code in a `<script>` tag at the bottom of their html. I don't like this, so I have split demos up into a `main` and `setup` file. Setup is for setting up the boilerplate and organising the (mostly) unchanging elements of the scene. Main is for building our actual demo for the week.
There's nothing spectacular about this structure, but I do want to point out 2 key things now, as they may pop up later down the line:
1. This structure is specifically for the purpose of demonstrating code in class. I try to abstract as much of the stuff that isn't related to that specific week away into the `setup` file or another helper file. This isn't super scalable, and you might need to modularise your code a lot further for your assignment.
2. When you need to create your own project from scratch, you could run into some issues when trying to import stuff from other files. Javascript wasn't originally designed for large projects with separate files. So much so that 2 separate standards for modularising Javascript code have been developed.
   - If you see the keywords `import` and `export`, then the code is using ESM (EcmaScript Modules). This is what this repository uses as well
   - If you see the keyword `require`, then the code is using CommonJS.

> [!IMPORTANT]
> The technical details between the two aren't relevant for this subject. ESM is generally regarded as the Javascript standard, and it's wise to keep the same pattern across your codebase as well.

Useful Resources:
 - [CommonJS vs ES Modules](https://betterstack.com/community/guides/scaling-nodejs/commonjs-vs-esm/)