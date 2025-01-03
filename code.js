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

    const maxIterations = n * n * 1000;  // Limit iterations to prevent excessive runtime
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
timerFunctionLocalSearch();
//timerFunctionHeldKarp();

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


function timerFunctionHeldKarp() {
    var n = 1; // Starting size
    var difference = 0;
    var result = 0;

    // Print table header
    console.log("| Matrix Size | Held Karp Time (s) | Held Karp Distance |");
    console.log("|-------------|--------------------|--------------------|");

    while (n <= 25) {
        const graph = randomGenerator(n);

        // Start timer for Held-Karp
        const start = Date.now();
        result = tsp_hk(graph); // Run Held-Karp
        const end = Date.now();

        // Calculate runtime
        difference = end - start;

        // Print results
        console.log(
            "| " + (n).toString().padEnd(12) +
            "| " + (difference / 1000).toFixed(3).padEnd(20) +
            "| " + result.toString().padEnd(20) + "|"
        );

        n++;
    }
}

function timerFunctionLocalSearch() {
    var n = 1; // Starting size
    var difference = 0;
    var result = 0;

    // Print table header
    console.log("| Matrix Size | Local Search Time (s) | Local Search Distance |");
    console.log("|-------------|-----------------------|-----------------------|");

    while (n <= 1000) {
        const graph = randomGenerator(n);

        // Start timer for Local Search
        const start = Date.now();
        result = tsp_ls(graph); // Run Local Search
        const end = Date.now();

        // Calculate runtime
        difference = end - start;

        // Print results
        console.log(
            "| " + (n).toString().padEnd(12) +
            "| " + (difference / 1000).toFixed(3).padEnd(23) +
            "| " + result.toString().padEnd(23) + "|"
        );

        n += 50;
    }
}
