## Zadanie 1

`Zaimplementować algorytm Steinhausa-Johnsona-Trottera - 3pkt – termin 23.10`

### Algorytm

1. The algorithm works by placing the numbers `1…n` in the increasing order and associating `LEFT <` as the direction for each of them

2. Find the largest mobile integer and swap it with the adjacent element on its direction without changing the direction of any of these two.

3. In doing so, if the largest mobile integer has reached a spot where it’s no more mobile, proceed with the next largest integer if it’s mobile (or with the next …). There’s a catch. Read step 4.

4. After each swapping, check if there’s any number, larger than the current largest mobile integer. If there’s one or more, change the direction of all of them.

5. The algorithm terminates when there are no more mobile integers.

### Przykłady

Dla `n=3`:

```sh
1. [ <1 <2 <3 ]
2. [ <1 <3 <2 ]
3. [ <3 <1 <2 ]
4. [ 3> <2 <1 ]
5. [ <2 3> <1 ]
6. [ <2 <1 3> ]
```

Dla `n=4`:

```sh
 1. [ <1 <2 <3 <4 ]
 2. [ <1 <2 <4 <3 ]
 3. [ <1 <4 <2 <3 ]
 4. [ <4 <1 <2 <3 ]
 5. [ 4> <1 <3 <2 ]
 6. [ <1 4> <3 <2 ]
 7. [ <1 <3 4> <2 ]
 8. [ <1 <3 <2 4> ]
 9. [ <3 <1 <2 <4 ]
10. [ <3 <1 <4 <2 ]
11. [ <3 <4 <1 <2 ]
12. [ <4 <3 <1 <2 ]
13. [ 4> 3> <2 <1 ]
14. [ 3> 4> <2 <1 ]
15. [ 3> <2 4> <1 ]
16. [ 3> <2 <1 4> ]
17. [ <2 3> <1 <4 ]
18. [ <2 3> <4 <1 ]
19. [ <2 <4 3> <1 ]
20. [ <4 <2 3> <1 ]
21. [ 4> <2 <1 3> ]
22. [ <2 4> <1 3> ]
23. [ <2 <1 4> 3> ]
24. [ <2 <1 3> 4> ]
```
