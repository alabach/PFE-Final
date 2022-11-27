package com.example.solver;

public class Derivate {

    static final double EPSILON = 0.001;

    static long derivativeTerm(String pTerm, long val)
    {

        // Get coefficient
        String coeffStr = "";
        int i;
        for (i = 0; pTerm.charAt(i) != 'x' ; i++)
        {
            if(pTerm.charAt(i)==' ')
                continue;
            coeffStr += (pTerm.charAt(i));
        }

        long coeff = Long.parseLong(coeffStr);

        // Get Power (Skip 2 characters for x and ^)
        String powStr = "";
        for (i = i + 2; i != pTerm.length() && pTerm.charAt(i) != ' '; i++)
        {
            powStr += pTerm.charAt(i);
        }

        long power=Long.parseLong(powStr);

        // For ax^n, we return a(n)x^(n-1)
        return coeff * power * (long)Math.pow(val, power - 1);
    }
    static long derivativeVal(String poly, int val)
    {
        long ans = 0;

        int i = 0;
        String[] stSplit = poly.split("\\+");
        while(i<stSplit.length)
        {
            ans = (ans +derivativeTerm(stSplit[i], val));
            i++;
        }
        return ans;
    }

}
