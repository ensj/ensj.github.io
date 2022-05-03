---
title: Git Blame is my new favorite git command!
date: 2020-11-07 12:40
categories: [Development]
tags: [thoughts, git]
---

Since June, I've been doing an internship at a place called [Riderdash](https://www.riderdash.com/). I've learned *quite* a lot of things in my stay here. React.js, the ELK stack, atomic design, data tracking, visualization, and the ability to work with non-developers for feature development. They're all pretty cool things in their own right. But of them all, I'm pretty certain that I'm very proud of myself for two things: learning to make use `git blame`. 

I've known about `git blame` for a while. A friend told me a funny story about it a long time ago, and it stuck with me. Thing is, I haven't really involved myself with a large-scale project before my first real engineering internship, so I never got to use it until recently.

`git blame` is a simple command. To use it, just write `git blame <filename>` to see a result like this:

![Git blame example](https://i.imgur.com/9zqoRUO.png)

As you can see, the command shows the hash of the commit where the last change was made in a line of the file, the author, and the date of the commit. The example above just shows my name for all of the lines since I'm the only person working on this blog. 

The command is especially useful if you find a bottleneck in during one of your own tasks. Sometimes when you implement a feature, you run across a bit of code that prevents your bit of code from running. Usually it's easy enough to figure out what this code is doing. Sometimes though, the code gets used across so many files or is so poorly written that you're just not sure if fixing it one way or the other would cause any problems. That's when I usually use git blame to find the previous author of the code. That way I can immediately go to them to ask questions about why the code is the way it is. 

...sometimes you just want to know who wrote garbage code on the project so that you know who you should hate, too. (more often than not it's you)

Regardless, the command has saved me invaluable time at work. If you work in a big project, I thoroughly recommend that you check it out and see for yourself how useful it is.

As a side, I use Visual Studio Code at work and have the extension Git Blame installed. It shows the author of the previous commit on the current line you're looking at on the bottom of the screen, and I'm quite a big fan of it. If you like the command, I highly recommend the extension.

Here is also a [funny thing](https://github.com/jayphelps/git-blame-someone-else) I found that lets you git blame someone else. Just... don't actually use at work. 