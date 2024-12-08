//Held Karp Algorithm
function tsp_hk(distance_matrix) {
    // Base case where there is only one or no entries in the distance_matrix
    if (distance_matrix.length <= 1) {
        return 0;
    }

    var cache = {}; // memoization

    function heldKarp(cities, start) {
        var key = JSON.stringify(cities) + start;

        // Return cached result if available
        if (cache[key] !== undefined) {
            return cache[key];
        }

        // if there are only two cities
        if (cities.length === 2) {
            const otherCity = cities.find(city => city !== start);
            return distance_matrix[start][otherCity];
        }
        //Assuming maximum distance between the cities
        let minDistance = Infinity;
        for (const nextCity of cities) {
            if (nextCity === start) continue;

            // remove the starting city
            const reducedCities = cities.filter(city => city !== start);
            
            // calculate the distance
            const distance = heldKarp(reducedCities, nextCity) + distance_matrix[start][nextCity];
            minDistance = Math.min(minDistance, distance);
        }
        // Store the result
        cache[key] = minDistance;
        return minDistance;
    }

    // Initialize the remaining cities
    const remaining = Array.from({ length: distance_matrix.length }, (_, i) => i);

    let shortestTour = Infinity;

    // Compute the shortest tour by trying each city as the starting point
    for (const startCity of remaining) {
        shortestTour = Math.min(shortestTour, heldKarp(remaining, startCity));
    }

    return shortestTour;
}


//Local Search algorithm
function tsp_ls(distance_matrix) {
    var n = distance_matrix.length;

    // Base case where there is only one or less than one city
    if (n === 0 || n === 1) {
        return 0; 
    }

    let currentRoute = generateRandomRoute(n); // Initialize with a random route
    let bestRoute = currentRoute; // Track the best route
    let currentLength = calculateRouteLength(currentRoute, distance_matrix);
    let bestLength = currentLength;

    const maxIterations = n * n;  // Limit iterations to prevent excessive runtime
    let iterations = 0;
    
    // Stopping criterion: no improvement for a set number of iterations
    while (iterations < maxIterations) {
        let i = Math.floor(Math.random() * (n - 1)); // Ensure i < n - 1
        let k = Math.floor(Math.random() * (n - i - 1)) + i + 1; // Ensure k > i

        let newRoute = twoOptSwap(currentRoute, i, k); // Perform 2-opt swap
        let newLength = calculateRouteLength(newRoute, distance_matrix);
        
        if (newLength < bestLength) {
            bestRoute = newRoute;
            bestLength = newLength;  // Update best route and best length
        }

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
        }

        iterations++;
    }

    return bestLength; // Return the length of the best route
}

// Function for swapping elements between i and k in reverse order
function twoOptSwap(route, i, k) {
    let newRoute = route.slice();
    let temp = newRoute.slice(i, k + 1).reverse();
    newRoute.splice(i, k - i + 1, ...temp);
    return newRoute;
}

// Calculates the route length
function calculateRouteLength(route, distance_matrix) {
    let length = 0;
    for (let i = 0; i < route.length - 1; i++) {
        length += distance_matrix[route[i]][route[i + 1]];
    }
    return length;
}

// Generates a random route for the given number of cities
function generateRandomRoute(n) {
    let route = [];
    for (let i = 0; i < n; i++) {
        route.push(i);
    }

    // Shuffle the route randomly
    for (let i = route.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [route[i], route[j]] = [route[j], route[i]];
    }
    return route;
}

//random matrix generator for testing
timerFunction()

function randomGenerator(n) {
    return Array.from({ length: n }, (_, i) => 
        Array.from({ length: n }, (_, j) => {
            if (i === j) {
                return 0;
            } else if (i === j - 1) {
                return 1;
            } else {
                let value = Math.floor(Math.random() * n);
                return value <= 0 ? 1 : value;
            }
        })
    );
}


function timerFunction(){
    var difference1 = 0
    var difference2 = 0
    var n = 1
    var result1 = 0
    var result2 = 0
    var graph = []
    
    // Print table header before the loop starts
    console.log("| Matrix Size | Held Karp Time (s) | Held Karp Distance | Local Search Time (s) | Local Search Distance |")
    console.log("|-------------|--------------------|--------------------|-----------------------|-----------------------|")
    
    // Increase the limit size for larger matrices
    while (n <= 25) {
        graph = randomGenerator(n)
        
        // Start the timer for Held-Karp
        var start1 = Date.now()
        result1 = tsp_hk(graph)
        var end1 = Date.now()
        
        // Start the timer for Local Search
        var start2 = Date.now()
        result2 = tsp_ls(graph)
        var end2 = Date.now()
        
        // Calculate time differences in milliseconds
        difference1 = end1 - start1
        difference2 = end2 - start2

        n = n + 1
        
        // Print the results in table format for each matrix size
        console.log("| " + (n - 1).toString().padEnd(12) + 
                    "| " + (difference1 / 1000).toFixed(3).padEnd(20) + 
                    "| " + result1.toString().padEnd(20) + 
                    "| " + (difference2 / 1000).toFixed(3).padEnd(23) + 
                    "| " + result2.toString().padEnd(23) + "|")
    }
}
