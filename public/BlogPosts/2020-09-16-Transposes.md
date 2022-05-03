# A Short (?) Introduction to Matrix Transposition Algorithms

## How I went into the rabbit hole

Recently I had the chance to try using PCA for a data analysis project I was working on at Riderdash. Specifically, I was trying to convert a time-series data into a user-feature matrix of sorts so that I could analyze it with dimensionality reduction.

I quickly realized that the way I had my data stored, it was kind of difficult to build a matrix I wanted out of it at once. So instead, I decided to flip the problem on its head and construct the transpose of the matrix and then transpose it back afterwards for the result I wanted.

At first, I thought to myself that I might as well construct a matrix transposition algorithm myself and go on with it. I did end up writing a rudimentary one, but in the middle I figured that there were smarter people than me in the universe and just went with one provided to me from a library.

That raised a question though. What even _is_ the fastest matrix transposition algorithm? The answer turned out to be a lot more interesting than I thought, since matrix transpositions have a surprising amount of intricacy to them.

---

## But what even is a matrix transpose, anyway?

Alas, before we even get to the topic, we need to review what a [**_transpose of a matrix_**](https://en.wikipedia.org/wiki/Transpose) even is. The following image from wikipedia sums it up best:

![From wikipedia's transpose article](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Matrix_transpose.gif/200px-Matrix_transpose.gif)

As you can see, you are simply rewriting the columns of the matrix as its rows. You can also understand it as "flipping the matrix along its diagonal". In mathematical notation, the matrix transpose satisfies the following property.

Given an $$n \times m$$ matrix $$A$$, $$[A^T]_{ij} = [A]_{ji}$$.

Implementing this as an algorithm seems _incredibly_ simple. It is, too! It's not at all difficult to write one yourself-- in fact, I recommend you actually give it a try before reading further.

So why then, did I say that matrix transposition algorithms are "interesting"?

---

## What makes Matrix Transpositions difficult

The main problem of matrix transposition algorithms is caused by something called a [**cache**](<https://en.wikipedia.org/wiki/Cache_(computing)>). Data is usually a bit costly to retrieve from the RAM or hard drive memory. This is why the CPU maintains a little cache of data that it will access frequently.

If the CPU fails to find data it needs in the cache, this is a **cache miss**. The CPU would need to search for the data in lower levels of memory, retrieve it, and store that chunk of data in the cache. On the contrary, if it does find the data it needs in the cache, this is a **cache hit**. Obviously, it would be best for performance if the CPU never experienced a cache miss.

Data is stored in chunks in the CPU due to something called a [**_locality of reference_**](https://en.wikipedia.org/wiki/Locality_of_reference). The tendency for the CPU to access data from the same place in memory multiple times in a short duration. Iterating through an array is the simplest example of this.

Locality of reference is a bit of a blessing and a curse. It allows certain algorithms to run incredibly fast, but other algorithms that are theoretically very fast suddenly become stupidly slow because of it. Unfortunately for us, matrix transposition algorithms belong to the latter case. This is because matrices often get horrendously large in real-life applications. As a result, swapping elements in the matrix requires jumping huge leaps in memory. Leaps big enough to cause cache misses. Not ideal.

The problem gets even more confusing as well once you realize that this has to be in-place for it to be of any use at all. After all, what use is the algorithm at all if it _copies_ gigabytes of data just to calculate a transpose?

In the end, it comes down to the following two questions:

1. Can we take advantage of locality of reference in our algorithm?
2. Can we use as little memory as possible?

In the following sections, we'll take a look at several different implementations of the transpose algorithm. We'll see what's good about it, what's cool about it, and what's bad about it. Maybe we'll even compare performances in the end if we still have time.

---

## First Attempt - Brute Force

```
def transpose(matrix):
    res = []
    for i in range(len(matrix[0])):
        res.append([])
        for e in range(len(matrix)):
            res[i].append(matrix[e][i])
    return res
```

I actually thought that the implementation above was decent when I first wrote it. It takes column vectors and pushes each element into an array to transpose it into a row vector. It works for both $$n \times n$$ matrices and $$n \times m$$ matrices. Not bad, eh?

Now that we've covered common issues with transposition algorithms, the problem is painfully obvious. It's not space-efficient at all, nor does it make _any_ attempt to take advantage of locality of reference.

In fact, you'd realize how horrible this actually is for locality of reference if you know how 2d arrays even work. Since 2d arrays store _pointers_ to different 1d arrays in memory, it's extremely easy to get cache misses every time you access a new array.

Thankfully, fixing both of these is a relatively easy task. Let's take a look at it one by one.

---

## Row-major, Column-major.

The 2d array issue is relatively simple. We can just store the array in a row-major order. Row-major ordering of a matrix is where each row of the matrix is laid out in a 1d array in a continuous order. There is also a method of ordering the matrix by columns, which is, of course, referred to as column-major ordering. For row-major $$n \times m$$ matrix $$A$$, you can access its element $$A_{ij}$$ with the following formula:

$$A_{ij} = m * i + j$$

For a column-major matrix, the formula would look like this:

$$A_{ij} = n * j + m$$

The same logic extends to higher dimensional matrices. Check out the [article](https://en.wikipedia.org/wiki/Row-_and_column-major_order) on row-major and column-major matrices in wikipedia here to learn more about how the formula can be generalized.

Getting back on topic, this information also provides us with a very intuitive and easy solution to our matrix transposition problem. If we take a row-majored matrix and read it from a column-major order, then we have our transposed matrix! Indeed, there are several systems that actually give you the transpose in this way. _Instead of actually taking the transpose, they just read you the same matrix in a different order._

---

## Second Attempt - Just read it sideways

```
def readByRow(matrix, n, m):
    for i in range(n * m):
        print matrix[i] + " "

def readByCol(matrix, n, m):
    for i in range(n * m):
        print matrix[(i * m)%(n * m)] + " "
```

This is a _lot_ better than before. Since we're just reading the matrix in an entirely different order, we give the transpose without even having to switch _anything_ around. We aren't using any extra memory by doing this, so this is probably the best way of getting the transpose of the matrix.

Except... it isn't. This method fails massively when the transpose is required numerous times. It's kind of obvious from the code that there's still going to be a lot of cache misses when reading. For algorithms like the Fast Fourier Transform that uses the transpose many times, this algorithm will behave very very slowly.

Still, we're definitely getting somewhere for sure. Though this algorithm has its own faults, it still gets used in certain programs as it isn't as expensive as actually swapping data most of the time.

---

## Can't we just go square?

We've kind of reached a point here where the path between $$n \times n$$ and $$n \times m$$ matrices split. One only gets slightly more difficult to understand while the other becomes _incredibly_ confusing thanks to beautiful number theory shenanigans.

For now, we'll focus solely on taking transposes of square matrices from here on out. I'll write a future article on $$n \times m$$ matrices, don't worry. It's just that going through square matrix transposition algorithms will still be a handful.

---

## Third Attempt - Ok, let's start over

```
def squareTranspose(matrix):
    if len(matrix) != len(matrix[0]):
        print("Hey! This isn't square!")
        return matrix
    n = len(matrix)
    for i in range(n):
        for e in range(i + 1, n):
            # xor swap
            matrix[i][e] = matrix[i][e]^matrix[e][i]
            matrix[e][i] = matrix[e][i]^matrix[i][e]
            matrix[i][e] = matrix[i][e]^matrix[e][i]
    return matrix
```

Good god, it's _so_ much easier once you know you're working with a square matrix, isn't it? It's all just swapping numbers! Such a simple implementation gives us an in-place algorithm already.

Of course, you know at this point that this still hasn't escaped the data locality issue. There's two very cool solutions to these, so let's take a look.

---

## Being (un)aware of the cache

In the end, the problem lies in the fact that the cache is of limited size. The problem worsens with the fact that every time a big "leap" in data happens, we're likely to run into a cache miss. Here's two solutions that have been proposed to solve this issue for square matrices.

1. Block the algorithm until it can move several numbers at once depending on the size of the cache line.
2. Recursively split the matrix into submatrices and swap them.

It's been suggested that the second method is actually better than the first one. This is because the first method has the issue where the algorithm’s performance is entirely dependent on the size of the cache. Thus, it needs to be constantly modified to work on different machines. It’s generally better to use the second method, which takes advantage of the cache without actually needing its information. When an algorithm is able to take advantage of the cache without having to see its specs, we say the algorithm is **cache-oblivious**. This is usually done by recursively breaking down a problem into subproblems until the cache no longer comes into the scope.

I'd love to try coding up an implementation of both of these solutions described above. But frankly, I'm a bit tired now and would like to get to these later. I'll see if I can write a performance article on all of the transpose algorithms mentioned in the future to compare.

---

## Conclusion

That turned out to be a long article, didn't it? Isn't it surprising that we're only halfway there to talking about the full story? I'll see if I can get the next half uploaded soon, so stay tuned. In the meantime, take a look at the wikipedia article for [in-place transpositions](https://en.wikipedia.org/wiki/In-place_matrix_transposition) for more detail.

### References:

- [In-place matrix transpositions (Wikipedia)](https://en.wikipedia.org/wiki/In-place_matrix_transposition#Square_matrices)
- [Row and column-major order (Wikipedia)](https://en.wikipedia.org/wiki/Row-_and_column-major_order)
- [Cache (Wikipedia)](<https://en.wikipedia.org/wiki/Cache_(computing)>)
- [Locality of reference (Wikipedia)](https://en.wikipedia.org/wiki/Locality_of_reference)
- [How does numpy transpose an array?](https://stackoverflow.com/questions/32034237/how-does-numpys-transpose-method-permute-the-axes-of-an-array)
