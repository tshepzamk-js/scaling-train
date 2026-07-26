const testData = {
    title: "Grade 12 Mathematics Baseline Diagnostic",
    meta: "Subject: Mathematics | Rank: A", 
    questions: [
        {
            id: 1,
            type: "multipart",
            q: "Algebra & Equations",
            subquestions: [
                {
                    subId: "1.1.1",
                    q: "Solve for $x$: $(x - 3)(x + 2) = 0$",
                    inputs: ["x_1", "x_2"],
                    ans: [["3", "x=3"], ["-2", "x=-2"]],
                    solution: "Setting each factor to zero gives $x - 3 = 0 \\implies x = 3$ or $x + 2 = 0 \\implies x = -2$."
                },
                {
                    subId: "1.1.2",
                    q: "Solve for $x$: $2x^2 - 5x - 3 = 0$",
                    inputs: ["x_1", "x_2"],
                    ans: [["-0.5", "-1/2", "x=-1/2", "x=-0.5"], ["3", "x=3"]],
                    solution: "Factorizing gives $(2x + 1)(x - 3) = 0$, yielding $x = -\\frac{1}{2}$ or $x = 3$."
                },
                {
                    subId: "1.1.3",
                    q: "Solve for $x$: $\\sqrt{x + 4} = x - 2$",
                    inputs: ["x"],
                    ans: [["5", "x=5"]],
                    solution: "Square both sides: $x + 4 = x^2 - 4x + 4 \\implies x^2 - 5x = 0 \\implies x(x - 5) = 0$. Validating options rejects $x = 0$, leaving $x = 5$."
                }
            ]
        },
        {
            id: 2,
            type: "multipart",
            q: "Patterns, Sequences & Series",
            subquestions: [
                {
                    subId: "2.1.1",
                    q: "Given the arithmetic sequence $3; 7; 11; 15; \\dots$, determine the general term ($T_n$).",
                    inputs: ["T_n"],
                    ans: [["4n-1", "4n - 1"]],
                    solution: "$a = 3$, $d = 4$. $T_n = a + (n - 1)d = 3 + 4(n - 1) = 4n - 1$."
                },
                {
                    subId: "2.1.2",
                    q: "Calculate the $20^{\\text{th}}$ term ($T_{20}$) of the sequence above.",
                    inputs: ["T_{20}"],
                    ans: [["79"]],
                    solution: "$T_{20} = 4(20) - 1 = 80 - 1 = 79$."
                },
                {
                    subId: "2.2.1",
                    q: "Given a geometric series where $a = 5$ and $r = 2$, calculate the sum of the first 6 terms ($S_6$).",
                    inputs: ["S_6"],
                    ans: [["315"]],
                    solution: "$S_6 = \\frac{a(r^6 - 1)}{r - 1} = \\frac{5(2^6 - 1)}{2 - 1} = 5(63) = 315$."
                },
                {
                    subId: "2.2.2",
                    q: "State the condition for a geometric series to converge.",
                    inputs: ["Condition"],
                    ans: [["-1<r<1", "|r|<1", "-1 < r < 1"]],
                    solution: "A geometric series converges when the common ratio $r$ falls strictly between $-1$ and $1$ (i.e., $|r| < 1$)."
                }
            ]
        },
        {
            id: 3,
            type: "multipart",
            q: "Functions & Inverses",
            subquestions: [
                {
                    subId: "3.1.1",
                    q: "Given $f(x) = 2x + 4$, write down the equation of $f^{-1}(x)$ in terms of $y$.",
                    inputs: ["y"],
                    ans: [["(x-4)/2", "0.5x-2", "x/2-2", "1/2x-2"]],
                    solution: "Swap $x$ and $y$: $x = 2y + 4 \\implies 2y = x - 4 \\implies y = \\frac{x - 4}{2}$."
                },
                {
                    subId: "3.2.1",
                    q: "Given the exponential function $g(x) = 3^x - 1$, write down the equation of its horizontal asymptote.",
                    inputs: ["Asymptote"],
                    ans: [["y=-1", "-1"]],
                    solution: "The horizontal shift constant defines the asymptote: $y = -1$."
                },
                {
                    subId: "3.2.2",
                    q: "Determine the $y$-intercept of $g(x) = 3^x - 1$.",
                    inputs: ["y-intercept"],
                    ans: [["0", "(0,0)", "y=0"]],
                    solution: "Set $x = 0$: $g(0) = 3^0 - 1 = 1 - 1 = 0$."
                }
            ]
        },
        {
            id: 4,
            type: "multipart",
            q: "Finance, Growth & Decay",
            tip: "Round all final financial calculations to 2 decimal places where applicable.",
            subquestions: [
                {
                    subId: "4.1",
                    q: "An amount of R10 000 is invested for 5 years at an interest rate of 8% p.a. compounded annually. Calculate the final value of the investment.",
                    inputs: ["Investment Value (R)"],
                    ans: [[14693.20, 14693.35], "14693.28", "14693,28"],
                    solution: "$A = P(1 + i)^n$<br>$A = 10000(1 + 0.08)^5 = \\text{R}14\\,693.28$"
                },
                {
                    subId: "4.2",
                    q: "A car valued at R150 000 depreciates at a rate of 12% p.a. on a reducing-balance method over 3 years. Calculate the value of the car after 3 years.",
                    inputs: ["Car Value (R)"],
                    ans: [[102220.70, 102220.90], "102220.80", "102220,80"],
                    solution: "$A = P(1 - i)^n$<br>$A = 150000(1 - 0.12)^3 = \\text{R}102\\,220.80$"
                }
            ]
        },
        {
            id: 5,
            type: "multipart",
            q: "Differential Calculus",
            subquestions: [
                {
                    subId: "5.1",
                    q: "Determine the derivative $f'(x)$ using <b>first principles</b> if $f(x) = 3x^2$.",
                    inputs: ["f'(x)"],
                    ans: [["6x"]],
                    solution: "$f'(x) = \\lim_{h \\to 0}\\frac{3(x+h)^2 - 3x^2}{h} = \\lim_{h \\to 0}\\frac{6xh + 3h^2}{h} = 6x$."
                },
                {
                    subId: "5.2.1",
                    q: "Determine $\\frac{dy}{dx}$ using differentiation rules: $y = 4x^3 - 2x + 7$",
                    inputs: ["dy/dx"],
                    ans: [["12x^2-2", "12x^2 - 2"]],
                    solution: "Applying the power rule gives $\\frac{dy}{dx} = 12x^2 - 2$."
                },
                {
                    subId: "5.2.2",
                    q: "Determine $\\frac{dy}{dx}$ using differentiation rules: $y = \\frac{3}{x^2}$",
                    inputs: ["dy/dx"],
                    ans: [["-6x^-3", "-6/x^3", "-6x^(-3)"]],
                    solution: "Rewrite as $y = 3x^{-2} \\implies \\frac{dy}{dx} = -6x^{-3} = -\\frac{6}{x^3}$."
                }
            ]
        },
        {
            id: 6,
            type: "multipart",
            q: "Trigonometry",
            subquestions: [
                {
                    subId: "6.1",
                    q: "Simplify without using a calculator: $\\sin(180^\\circ - \\theta) \\cdot \\cos(90^\\circ - \\theta) + \\cos^2\\theta$",
                    inputs: ["Value"],
                    ans: [["1"]],
                    solution: "$\\sin(180^\\circ - \\theta) = \\sin\\theta$ and $\\cos(90^\\circ - \\theta) = \\sin\\theta$. Thus, $\\sin^2\\theta + \\cos^2\\theta = 1$."
                },
                {
                    subId: "6.2",
                    q: "Solve for $\\theta \\in [0^\\circ ; 360^\\circ]$ given $2\\sin\\theta - 1 = 0$.",
                    inputs: ["\\theta_1", "\\theta_2"],
                    ans: [["30", "30 deg", "30°"], ["150", "150 deg", "150°"]],
                    solution: "$\\sin\\theta = 0.5$. Reference angle is $30^\\circ$. Quad 1: $\\theta = 30^\\circ$, Quad 2: $\\theta = 180^\\circ - 30^\\circ = 150^\\circ$."
                }
            ]
        },
        {
            id: 7,
            type: "multipart",
            q: "Analytical Geometry (Given $A(-2, 1)$ and $B(4, 5)$)",
            subquestions: [
                {
                    subId: "7.1",
                    q: "Calculate the gradient of line $AB$.",
                    inputs: ["m"],
                    ans: [["2/3", "0.67", "0.666", "0.667"]],
                    solution: "$m = \\frac{5 - 1}{4 - (-2)} = \\frac{4}{6} = \\frac{2}{3}$."
                },
                {
                    subId: "7.2",
                    q: "Determine the midpoint $M$ of line $AB$.",
                    inputs: ["M_x", "M_y"],
                    ans: [["1", "x=1"], ["3", "y=3"]],
                    solution: "$M\\left(\\frac{-2 + 4}{2}, \\frac{1 + 5}{2}\\right) = M(1, 3)$."
                },
                {
                    subId: "7.3",
                    q: "Find the equation of the circle centered at the origin $(0,0)$ that passes through point $B(4,5)$.",
                    inputs: ["Equation"],
                    ans: [["x^2+y^2=41", "x^2 + y^2 = 41"]],
                    solution: "$r^2 = 4^2 + 5^2 = 16 + 25 = 41$. The circle equation is $x^2 + y^2 = 41$."
                }
            ]
        }
    ]
};


