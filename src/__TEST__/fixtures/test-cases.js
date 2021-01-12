const testCases = [
  [
    "original test case from example",
    `5 3 
1 1 E 
RFRFRFRF 

3 2 N 
FRRFLLFFRRFLL 

0 3 W 
LLFFFLFLFL`,
    `1 1 E
3 3 N LOST
2 3 S
`,
  ],
  [
    "1x1 grid losing one robot",
    `0 0 
0 0 N 
F`,
    `0 0 N LOST
`,
  ],
  [
    "1x1 grid losing 4 robots & retrying with no loss",
    `0 0 
0 0 N 
F 

0 0 E 
F  

0 0 S 
F

0 0 W 
F

0 0 N 
F 

0 0 E 
F  

0 0 S 
F

0 0 W 
F`,
    `0 0 N LOST
0 0 E LOST
0 0 S LOST
0 0 W LOST
0 0 N
0 0 E
0 0 S
0 0 W
`,
  ],
];

export default testCases;
