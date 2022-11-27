package com.example.solver;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TreeSet;

@SpringBootApplication
public class SolverApplication {
    static final double EPSILON = 0.001;

    // An example function whose solution
    // is determined using Bisection Method.
    // The function is x^3 - x^2 + 2
    static double func(double x)
    {
        return x * x * x ;
    }

    // Derivative of the above function
    // which is 3*x^x - 2*x
    static double derivFunc(double x)
    {
        return 3 * x * x ;
    }

    // Function to find the root
    static void newtonRaphson(double x)
    {
        double h = func(x) / derivFunc(x);
        while (Math.abs(h) >= EPSILON)
        {
            h = func(x) / derivFunc(x);

            // x(i+1) = x(i) - f(x) / f'(x)
            x = x - h;
        }

        System.out.print("The value of the"+func(x)
                + " root is : "
                + Math.round(x * 100.0) / 100.0);
    }

    public static void main(String[] args) {
        SpringApplication.run(SolverApplication.class, args);

        // Initial values assumed
        double x0 = -20;
        newtonRaphson(x0);
    }

}
