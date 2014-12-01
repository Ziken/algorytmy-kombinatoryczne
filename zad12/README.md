## Zadanie 12

`12. Znaleźć największy możliwy zakres opłat pocztowych (opłaty pocztowe przyjmują kolejne wartości 1, 2, 3, …....),
przy założeniu, że mamy n rodzajów znaczków pocztowych, a na jednej kopercie może być co najwyżej m znaczków.
Zastosować komputerową implementację problemu – termin 10.12 - 3 pkt`

### Zbiór rozwiązań (tylko zakresy)

[OEIS - The Postage Stamps Problem Solutions ](https://oeis.org/search?q=stamp&sort=&language=english&go=Search)

### Przykład

Dla `n = 1` i kolejnych `m`:

```
m = 1
1..1 [ 1 ]
1 = [ 1 ]

m = 2
1..2 [ 1 ]
1 = [ 1 ]
2 = [ 1 1 ]

m = 3
1..3 [ 1 ]
1 = [ 1 ]
2 = [ 1 1 ]
3 = [ 1 1 1 ]
```

Dla `n = 2` i koleknych `m`:

```
m = 1
1..2 [ 1 2 ]
1 = [ 1 ]
2 = [ 2 ]

m = 2
1..4 [ 1 2 ]
1 = [ 1 ]
2 = [ 2 ]
3 = [ 2 1 ]
4 = [ 2 2 ]

1..4 [ 1 3 ]
1 = [ 1 ]
2 = [ 1 1 ]
3 = [ 3 ]
4 = [ 3 1 ]

m = 3
1..7 [ 1 3 ]
1 = [ 1 ]
2 = [ 1 1 ]
3 = [ 3 ]
4 = [ 3 1 ]
5 = [ 3 1 1 ]
6 = [ 3 3 ]
7 = [ 3 3 1 ]
```
