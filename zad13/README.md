## Zadanie 13

`13. Zaimplementować dwa równolegle działające sita obliczające elementy ciągu U={1, 2, 3, 4, 6, 8, 11, 13, 16, 18, ….......}. Na początku mamy ciąg U={1,2}. Kolejne wyrazy ciągu spełniają warunek, że są sumą dokładnie jednej pary różnych elementów od niego mniejszych. Pierwsze sito eliminuje liczby, które nie są sumami dwóch różnych elementów, które wystąpiły wcześniej. Drugie zaś sito eliminuje liczby, dla których istnieje więcej niż jedna para takich liczb. Termin 10.12 – 3pkt (b. ważne – 2 sita)`

### Przykład

Elementy ciagu `U` z przedziału `<1,100>`:

```
[ 1, 2, 3, 4, 6, 8, 11, 13, 16, 18, 26, 28, 36, 38, 47, 48, 53, 57, 62, 69, 72, 77, 82, 87, 97, 99 ]

3	OK   [ 1,2 ]
4	OK   [ 1,3 ]
5	--   [ 1,4 ]  [ 2,3 ]
6	OK   [ 2,4 ]
7	--   [ 1,6 ]  [ 3,4 ]
8	OK   [ 2,6 ]
9	--   [ 1,8 ]  [ 3,6 ]
10	--   [ 2,8 ]  [ 4,6 ]
11	OK   [ 3,8 ]
12	--   [ 1,11 ]  [ 4,8 ]
13	OK   [ 2,11 ]
14	--   [ 1,13 ]  [ 3,11 ]  [ 6,8 ]
15	--   [ 2,13 ]  [ 4,11 ]
16	OK   [ 3,13 ]
17	--   [ 1,16 ]  [ 4,13 ]  [ 6,11 ]
18	OK   [ 2,16 ]
19	--   [ 1,18 ]  [ 3,16 ]  [ 6,13 ]  [ 8,11 ]
20	--   [ 2,18 ]  [ 4,16 ]
21	--   [ 3,18 ]  [ 8,13 ]
22	--   [ 4,18 ]  [ 6,16 ]
23	--  
24	--   [ 6,18 ]  [ 8,16 ]  [ 11,13 ]
25	--  
26	OK   [ 8,18 ]
27	--   [ 1,26 ]  [ 11,16 ]
28	OK   [ 2,26 ]
29	--   [ 1,28 ]  [ 3,26 ]  [ 11,18 ]  [ 13,16 ]
30	--   [ 2,28 ]  [ 4,26 ]
31	--   [ 3,28 ]  [ 13,18 ]
32	--   [ 4,28 ]  [ 6,26 ]
33	--  
34	--   [ 6,28 ]  [ 8,26 ]  [ 16,18 ]
35	--  
36	OK   [ 8,28 ]
37	--   [ 1,36 ]  [ 11,26 ]
38	OK   [ 2,36 ]
39	--   [ 1,38 ]  [ 3,36 ]  [ 11,28 ]  [ 13,26 ]
40	--   [ 2,38 ]  [ 4,36 ]
41	--   [ 3,38 ]  [ 13,28 ]
42	--   [ 4,38 ]  [ 6,36 ]  [ 16,26 ]
43	--  
44	--   [ 6,38 ]  [ 8,36 ]  [ 16,28 ]  [ 18,26 ]
45	--  
46	--   [ 8,38 ]  [ 18,28 ]
47	OK   [ 11,36 ]
48	OK   [ 1,47 ]
49	--   [ 1,48 ]  [ 2,47 ]  [ 11,38 ]  [ 13,36 ]
50	--   [ 2,48 ]  [ 3,47 ]
51	--   [ 3,48 ]  [ 4,47 ]  [ 13,38 ]
52	--   [ 4,48 ]  [ 16,36 ]
53	OK   [ 6,47 ]
54	--   [ 1,53 ]  [ 6,48 ]  [ 16,38 ]  [ 18,36 ]  [ 26,28 ]
55	--   [ 2,53 ]  [ 8,47 ]
56	--   [ 3,53 ]  [ 8,48 ]  [ 18,38 ]
57	OK   [ 4,53 ]
58	--   [ 1,57 ]  [ 11,47 ]
59	--   [ 2,57 ]  [ 6,53 ]  [ 11,48 ]
60	--   [ 3,57 ]  [ 13,47 ]
61	--   [ 4,57 ]  [ 8,53 ]  [ 13,48 ]
62	OK   [ 26,36 ]
63	--   [ 1,62 ]  [ 6,57 ]  [ 16,47 ]
64	--   [ 2,62 ]  [ 11,53 ]  [ 16,48 ]  [ 26,38 ]  [ 28,36 ]
65	--   [ 3,62 ]  [ 8,57 ]  [ 18,47 ]
66	--   [ 4,62 ]  [ 13,53 ]  [ 18,48 ]  [ 28,38 ]
67	--  
68	--   [ 6,62 ]  [ 11,57 ]
69	OK   [ 16,53 ]
70	--   [ 1,69 ]  [ 8,62 ]  [ 13,57 ]
71	--   [ 2,69 ]  [ 18,53 ]
72	OK   [ 3,69 ]
73	--   [ 1,72 ]  [ 4,69 ]  [ 11,62 ]  [ 16,57 ]  [ 26,47 ]
74	--   [ 2,72 ]  [ 26,48 ]  [ 36,38 ]
75	--   [ 3,72 ]  [ 6,69 ]  [ 13,62 ]  [ 18,57 ]  [ 28,47 ]
76	--   [ 4,72 ]  [ 28,48 ]
77	OK   [ 8,69 ]
78	--   [ 1,77 ]  [ 6,72 ]  [ 16,62 ]
79	--   [ 2,77 ]  [ 26,53 ]
80	--   [ 3,77 ]  [ 8,72 ]  [ 11,69 ]  [ 18,62 ]
81	--   [ 4,77 ]  [ 28,53 ]
82	OK   [ 13,69 ]
83	--   [ 1,82 ]  [ 6,77 ]  [ 11,72 ]  [ 26,57 ]  [ 36,47 ]
84	--   [ 2,82 ]  [ 36,48 ]
85	--   [ 3,82 ]  [ 8,77 ]  [ 13,72 ]  [ 16,69 ]  [ 28,57 ]  [ 38,47 ]
86	--   [ 4,82 ]  [ 38,48 ]
87	OK   [ 18,69 ]
88	--   [ 1,87 ]  [ 6,82 ]  [ 11,77 ]  [ 16,72 ]  [ 26,62 ]
89	--   [ 2,87 ]  [ 36,53 ]
90	--   [ 3,87 ]  [ 8,82 ]  [ 13,77 ]  [ 18,72 ]  [ 28,62 ]
91	--   [ 4,87 ]  [ 38,53 ]
92	--  
93	--   [ 6,87 ]  [ 11,82 ]  [ 16,77 ]  [ 36,57 ]
94	--  
95	--   [ 8,87 ]  [ 13,82 ]  [ 18,77 ]  [ 26,69 ]  [ 38,57 ]  [ 47,48 ]
96	--  
97	OK   [ 28,69 ]
98	--   [ 1,97 ]  [ 11,87 ]  [ 16,82 ]  [ 26,72 ]  [ 36,62 ]
99	OK   [ 2,97 ]
100	--   [ 1,99 ]  [ 3,97 ]  [ 13,87 ]  [ 18,82 ]  [ 28,72 ]  [ 38,62 ]  [ 47,53 ]
```
