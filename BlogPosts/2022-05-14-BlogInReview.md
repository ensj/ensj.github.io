# Blog In Review

After the first iteration of my blog (which I built with Jekyll, as most github pages users do), I kind of didn't really touch it after writing a few blog posts. A part of the reason why was admittedly because I felt a bit lazy about writing new blog posts. I'm still working on that. But the bigger reason was that I didn't feel Jekyll was adequete for the purposes of my blog.

## What did I want for my blog?

Well, I'm still trying to figure that out. But at the core of everything, I wanted a blog that I could easily customize, easily add new features to, and most importantly, build data visualizations and the like with relative ease. Having used React.js and Typescript for most of my projects, it was natural to use it to build this shiny new website.

Now, why was Jekyll inadequete for the purposes described above? Well, the easiest reason that comes to mind is that Jekyll wasn't something I was that keen on picking up for learning. I didn't have that many reasons to learn Ruby, and I didn't see why Jekyll was a reason to start. I also wanted to hone my javascript skills, and saw this blog as the perfect place to do so.

## Some Challenges

Of course, creating this blog with React came with its own set of challenges. I mean, dealing with CSS all over again was one, trying to dynamically manipulate the js canvas size according to the display size was anoyher one, and there's a small bug that has to deal with the dynamic size manipulation of the pdf element in the About section as well. Trying to figure out how to get KaTeX to work with the markdown renderer was a pain, too! There's really no end to the small troubles I ran into when I was creating this version of the blog.

But none of those problems really held a candle to the dynamic markdown rendering feature I wanted to create. See, Github Pages is a static website hosting service. Now, because of this we have to compile our code using webpack and use that to render whatever comes out at the end of it. This makes dynamic rendering really annoying! Unless you have a database or somewhere else where our React app could fetch the data from, you'd basically have to hardcode every new route for every new blog post.

I wasn't about to create a database just for maintaining my blog posts. I might create one later down the line, but right now wasn't it! Thankfully, there was an alternate solution in the form of the `public` folder (I should note at this point that this website was created with the `create-react-app`).

## The Solution

The `public` folder essentially allows us to add assets from outside the module system. Since webpack doesn't compile anything within this folder, we can dynamically reference the paths of the files in this folder! It's not a full solution to my problem, but it's definitely a huge start.

I started by adding a `BlogPosts` folder, and added my markdown files there. From there, I ran into another problem. I couldn't just use the `fs` module like I would in a typical Node.js app to access filenames dynamically! Plus, I was also worried that I would have to fetch _everything_ in the folder any time I had to create a list of blog previews or generate a list of routes for the blogs.

Eventually, I settled on the solution of creating a json file listing filepaths, blog titles, post dates, blog previews, etc. Everything that should go in the frontmatter of these markdown files went into this one json file. Then, the first thing my React app would do upon being loaded would be to fetch the list of blogs from the json file, generate the routes, the blog previews, and the user would be on their merry way! It's not a clean solution, but it's definitely a working one.

In the future, I plan on migrating my blog posts along with anything else I have onto a separate database. I don't think it's a good idea in the long term to keep all of my markdown files in the `public` folder to begin with. But until then, I like to think this is a pretty good migration from Jekyll to React!
