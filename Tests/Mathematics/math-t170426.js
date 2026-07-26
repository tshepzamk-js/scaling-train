const testData = {
    title: "Calculus: Full Chapter",
    meta: "Grade 12 | Rank: A", 
    questions: [
        // --- TOPIC 1: DERIVATIVES ---
        {
            id: 1,
            type: "standard",
            q: "Find the derivative $f'(x)$ of $f(x) = x^3 + x^2 + x + 1$.",
            inputs: ["f'(x)"],
            ans: ["3x^2+2x+1"],
            solution: "Apply the power rule term by term: $\\frac{d}{dx}[x^3] = 3x^2$, $\\frac{d}{dx}[x^2] = 2x$, $\\frac{d}{dx}[x] = 1$, and $\\frac{d}{dx}[1] = 0$. Combining them gives $3x^2 + 2x + 1$."
        },
        {
            id: 2,
            type: "standard",
            q: "Find the derivative $g'(x)$ of $g(x) = 4x^3 - 5x + 2$.",
            inputs: ["g'(x)"],
            ans: ["12x^2-5"],
            solution: "Differentiating using the power rule yields: $4(3x^2) - 5(1) + 0 = 12x^2 - 5$."
        },
        {
            id: 3,
            type: "standard",
            q: "Calculate the gradient of $f(x) = x^3$ at the point where $x = 2$.",
            inputs: ["Gradient"],
            ans: ["12"],
            solution: "First find the general gradient derivative: $f'(x) = 3x^2$. Evaluate at $x = 2$: $f'(2) = 3(2)^2 = 3(4) = 12$."
        },
        {
            id: 4,
            type: "standard",
            q: "At what value of $x$ is the gradient of $y = x^3$ equal to 27?",
            inputs: ["x-value(s)"],
            ans: [["3 or -3", "3 and -3", "3,-3", "-3,3", "x=3 or x=-3"]],
            solution: "Set the derivative equal to 27: $\\frac{dy}{dx} = 3x^2 = 27 \\implies x^2 = 9$. Taking the square root gives $x = 3$ or $x = -3$."
        },
        {
            id: 5,
            type: "standard",
            q: "Find the derivative of $h(x) = \\frac{1}{3}x^3 - 4x^2$.",
            inputs: ["h'(x)"],
            ans: ["x^2-8x"],
            solution: "Differentiate each term: $\\frac{1}{3}(3x^2) - 4(2x) = x^2 - 8x$."
        },
        
        // --- TOPIC 2: STATIONARY POINTS (TURNING POINTS) ---
        {
            id: 6,
            type: "standard",
            q: "Solve for $x$ if $f'(x) = 0$ for the function $f(x) = x^3 - 3x$.",
            inputs: ["x-value(s)"],
            ans: [["x = 1 or x = -1", "1 or -1", "1,-1", "-1,1", "1 and -1", "x=1, x=-1"]],
            solution: "Find the derivative: $f'(x) = 3x^2 - 3$. Set to $0$: $3x^2 - 3 = 0 \\implies 3(x^2 - 1) = 0 \\implies x = 1$ or $x = -1$."
        },
        {
            id: 7,
            type: "standard",
            q: "Find the y-coordinate of the local maximum of $f(x) = x^3 - 3x$.",
            inputs: ["y-coordinate"],
            ans: ["2"],
            solution: "From Q6, the stationary coordinates occur at $x=1$ and $x=-1$. Test the inputs: $f(1) = (1)^3-3(1) = -2$ (Minimum). $f(-1) = (-1)^3-3(-1) = -1 + 3 = 2$ (Maximum). The maximum y-coordinate value is 2."
        },
        {
            id: 8,
            type: "standard",
            q: "How many stationary points does a standard cubic function $y = ax^3 + bx^2 + cx + d$ typically have?",
            inputs: ["Maximum Stationary Points"],
            ans: [["at most 2", "2", "maximum of 2", "up to 2"]],
            solution: "The derivative of a cubic function is a quadratic function ($2$nd degree equation). A quadratic equation can have a maximum of 2 real roots, meaning a cubic can have at most 2 stationary turning locations."
        },
        {
            id: 9,
            type: "standard",
            q: "Determine the stationary points of $g(x) = x^3 - 12x + 5$.",
            inputs: ["x-value(s)"],
            ans: [["x = 2 and x = -2", "2 and -2", "2,-2", "-2,2", "2 or -2", "x=2, x=-2"]],
            solution: "Differentiate and set to zero: $g'(x) = 3x^2 - 12 = 0 \\implies 3(x^2 - 4) = 0 \\implies x = 2$ and $x = -2$."
        },
        {
            id: 10,
            type: "standard",
            q: "If a cubic graph has turning points at $x=0$ and $x=4$, what is the x-coordinate of its inflection point?",
            inputs: ["x-coordinate"],
            ans: ["2"],
            solution: "The inflection point of a cubic function lies exactly halfway between its two local turning points: $\\frac{0 + 4}{2} = 2$."
        },
        
        // --- TOPIC 3: SECOND DERIVATIVES & CONCAVITY ---
        {
            id: 11,
            type: "standard",
            q: "Find the second derivative $f''(x)$ of $f(x) = 2x^3 - 6x^2$.",
            inputs: ["f''(x)"],
            ans: ["12x-12"],
            solution: "First derivative: $f'(x) = 6x^2 - 12x$. Second derivative: $f''(x) = 12x - 12$."
        },
        {
            id: 12,
            type: "standard",
            q: "Solve $f''(x) = 0$ for $f(x) = x^3 - 9x^2 + 24x$.",
            inputs: ["x-value"],
            ans: ["3"],
            solution: "First derivative: $f'(x) = 3x^2 - 18x + 24$. Second derivative: $f''(x) = 6x - 18$. Set to $0$: $6x - 18 = 0 \\implies 6x = 18 \\implies x = 3$."
        },
        {
            id: 13,
            type: "standard",
            q: "On what interval is $y = x^3$ concave up?",
            inputs: ["Interval"],
            ans: [["x > 0", "x>0", "(0,inf)", "0<x"]],
            solution: "Find second derivative: $y' = 3x^2 \\implies y'' = 6x$. Concave up condition occurs where $y'' > 0 \\implies 6x > 0 \\implies x > 0$."
        },
        {
            id: 14,
            type: "standard",
            q: "On what interval is $y = -x^3 + 6x^2$ concave down?",
            inputs: ["Interval"],
            ans: [["x > 2", "x>2", "(2,inf)", "2<x"]],
            solution: "First derivative: $y' = -3x^2 + 12x$. Second derivative: $y'' = -6x + 12$. Concave down condition occurs where $y'' < 0 \\implies -6x + 12 < 0 \\implies -6x < -12 \\implies x > 2$."
        },
        {
            id: 15,
            type: "standard",
            q: "What is the value of the second derivative at a point of inflection?",
            inputs: ["Value"],
            ans: ["0"],
            solution: "By definition, the concavity changes at a point of inflection, and the second derivative is zero ($f''(x) = 0$) provided it changes sign."
        },
        
        // --- TOPIC 4: INTERCEPTS & ROOTS ---
        {
            id: 16,
            type: "standard",
            q: "Find the y-intercept of $f(x) = 2x^3 - 5x^2 + 3x - 7$.",
            inputs: ["y-intercept"],
            ans: ["-7"],
            solution: "Set $x = 0$: $f(0) = 2(0)^3 - 5(0)^2 + 3(0) - 7 = -7$."
        },
        {
            id: 17,
            type: "standard",
            q: "Find the x-intercepts of $f(x) = x^3 - 4x$.",
            inputs: ["x-intercept value(s)"],
            ans: [["0, 2, -2", "0,2,-2", "-2,0,2", "2,0,-2", "x=0,x=2,x=-2"]],
            solution: "Set $f(x) = 0$ and factorize: $x(x^2 - 4) = 0 \\implies x(x - 2)(x + 2) = 0$. The roots are $x = 0$, $x = 2$, and $x = -2$."
        },
        {
            id: 18,
            type: "standard",
            q: "Find the x-intercepts of $g(x) = x^3 - x^2$.",
            inputs: ["x-intercept value(s)"],
            ans: [["0 and 1", "0,1", "1,0", "0 and 1", "x=0, x=1"]],
            solution: "Set $g(x) = 0$ and factor out a square base: $x^2(x - 1) = 0$. Therefore, $x = 0$ or $x = 1$."
        },
        {
            id: 19,
            type: "standard",
            q: "If $(x-1)$ is a factor of $x^3 + kx^2 + x - 3$, find $k$.",
            inputs: ["k"],
            ans: ["1"],
            solution: "By the Factor Theorem, if $(x-1)$ is a factor, then evaluating the expression at $x = 1$ must equal $0$: $(1)^3 + k(1)^2 + (1) - 3 = 0 \\implies 1 + k + 1 - 3 = 0 \\implies k - 1 = 0 \\implies k = 1$."
        },
        {
            id: 20,
            type: "standard",
            q: "Find the coordinates of the point where $y = x^3$ crosses the y-axis.",
            inputs: ["Coordinates (x,y)"],
            ans: [["(0, 0)", "(0,0)", "0,0"]],
            solution: "The point where a graph crosses the y-axis is its y-intercept (where $x=0$). If $x=0$, $y=(0)^3=0$. The coordinates are $(0, 0)$."
        },
        
        // --- TOPIC 5: INTEGRATED ANALYSIS (THE CHALLENGE) ---
        {
            id: 21,
            type: "standard",
            q: "Find the inflection point of $f(x) = x^3 - 6x^2 + 12x$.",
            inputs: ["Coordinates (x,y)"],
            ans: [["(2, 8)", "(2,8)", "2,8"]],
            solution: "Find second derivative: $f'(x) = 3x^2 - 12x + 12 \\implies f''(x) = 6x - 12$. Set $f''(x) = 0 \\implies 6x = 12 \\implies x = 2$. Find the corresponding y-value: $f(2) = (2)^3 - 6(2)^2 + 12(2) = 8 - 24 + 24 = 8$. The inflection node is at $(2, 8)$."
        },
        {
            id: 22,
            type: "standard",
            q: "Find the equation of the tangent to $y = x^3$ at $x = 1$.",
            inputs: ["Equation"],
            ans: ["y=3x-2"],
            solution: "Find the point coordinate: at $x=1, y=(1)^3=1 \\implies (1,1)$. Find the gradient slope: $\\frac{dy}{dx} = 3x^2 \\implies m = 3(1)^2 = 3$. Use the equation line form: $y - y_1 = m(x - x_1) \\implies y - 1 = 3(x - 1) \\implies y = 3x - 3 + 1 \\implies y = 3x - 2$."
        },
        {
            id: 23,
            type: "standard",
            q: "If $f'(x) = 3x^2 - 6x$, for what values of $x$ is the function $f$ increasing?",
            inputs: ["Interval"],
            ans: [["x < 0 or x > 2", "x<0 or x>2", "x < 0, x > 2", "x<0, x>2"]],
            solution: "A function increases where its derivative is positive ($f'(x) > 0$). Solve $3x(x - 2) > 0$. The critical boundaries are $x=0$ and $x=2$. The quadratic expression is positive outside these roots: $x < 0$ or $x > 2$."
        },
        {
            id: 24,
            type: "standard",
            q: "Determine the nature of the stationary point at $x=0$ for $y = x^3$.",
            inputs: ["Nature of Point"],
            ans: [["point of inflection (stationary)", "point of inflection", "inflection point", "stationary inflection point"]],
            solution: "Derivative $y' = 3x^2$. At $x=0, y'=0$ (Stationary point). Second derivative $y'' = 6x$. At $x=0, y''=0$, and $y''$ changes sign from negative (for $x<0$) to positive (for $x>0$). This marks a stationary Point of Inflection."
        },
        {
            id: 25,
            type: "standard",
            q: "A cubic graph has turning points at $(-1, 4)$ and $(3, -28)$. Find the $y-coordinate$ of its inflection point.",
            inputs: ["y-coordinate"],
            ans: [["-12"]],
            solution: "Because a cubic curve is perfectly symmetrical about its inflection center point, the inflection point coordinates are the exact midpoints of the turning point coordinates. Midpoint $y = \\frac{4 + (-28)}{2} = \\frac{-24}{2} = -12$."
        }
    ]
};