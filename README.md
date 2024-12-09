# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.


References used:
tsp-comparison-ClaytonBrown4741

I have implemented the same random function from the above repository for testing the empirical analysis of the comparison between Held Karp and Local search algorithm I implemented. However, I have changed the way the data is logged into the console. Along with that I made the random generator run until the input size of 25 is reached. However I was only able to have the data up until the input size of 19. Anything more than that has been ran for about close to an hour for solving the held karp. However the local search always stayed 0 because it tries a maximum of n*n iterations and stops. I ran the code again for about an hour to see if I can get the runtime for input size of 20 but I was unsuccessful. 

UPDATE: I have made changes where the random functions creates and tests the held karp funtion and the local search function seperately. I was able to test the local search again and was able to make it run for a much longer time than the 0 value I received up until the input value of 20. The new code I wrote tests input sizes of up to 10000 at every 100 intervals of the input size. This waas very helpful to see how it effects the performance of the local search algorithm and also made a huge difference in the length of the route produced to be a large number. I have included the data I received so far in the data file for local search. the time keeps increasing as it goes. 

The reason that the lenght of the tour that Held Karp found is always less than or atmost equal to that length of the tour that was found by local search is because held karp always makes sure to find the best route by going through every iteration possible whereas the local search randomly selects and goes through the cities and does this for a maximum of n*n iterations and gives out the best route found so far. This is also the reason why the input sizes are very different to get the algorithms run for more than a hour.tsp-comparison-ClaytonBrown4741  

The graphs included are for the data under try 2

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice