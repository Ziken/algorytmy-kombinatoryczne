## Zadanie 11

`11. Zaimplementować algorytm oparty na metodzie powrotów rozwiązujący problem Nurikabe: (dla zadanej przez użytkownika planszy – samo jej ustalenie już nie jest trywialne).
Mamy siatkę z kwadratowymi polami (komórkami). Niektóre z tych komórek zawierają cyfry. Naszym celem jest ustalenie, które z komórek siatki są białe, a które czarne (Używając nazewnictwa Wyspy na Jeziorze: zamiast białego i czarnego pola odpowiednio mamy "wodę" i "ląd").
Czarne pola uformują "nurikabe" ("Jezioro"). Czarne pola muszą tworzyć jedną figurę - formę ciągłą (jedna figura składająca się z komórek), czarne pola nie zawierają cyfr, a także nie mogą tworzyć kwadratów 2x2 lub większych prostokątów.
Białe pola uformują "Wyspy": Każda cyfra n musi być częścią n-elementowego pola złożonego z białych komórek. Każda z białych komórek należy tylko do jednej wyspy; każda wyspa może posiadać tylko jedną komórkę z cyfrą.`

`Przykład: dla szachownicy 5x5`

![plansza-startowa](./img/plansza-start.png)

`rozwiązaniem jest`

![plansza-końcowa](./img/plansza-koniec.png)

`5 pkt, termin 10.12`

### Przykład

#### Przykład 1 (z treści zadania)

Problem:

```
  1   1  |
         |
3       3|
         |
3        |
----------
```

Rozwiązanie:

```
  1   1  |
         |
3 # #   3|
        #|
3 # #   #|
----------
```

#### Przykład 2

Źródło: [Sample problems of Nurikabe puzzle: Sample problem 1, 10x10,	Easy, by SAKAMOTO & Nobuyuki](http://www.nikoli.com/en/puzzles/nurikabe/)

Problem:

```
              5   2|
3                  |
  4     2          |
            3      |
  4       4        |
                  3|
                   |
                   |
  3     3          |
    1     1   3   3|
--------------------
```

Rozwiązanie:

```
# #   # # # # 5   2|
3                 #|
  4 #   2 #   #    |
    # #     3 #   #|
  4       4       #|
  # # #   # # #   3|
                   |
  # #   # #   #   #|
  3     3     #   #|
    1     1   3   3|
--------------------
```

### Przykład 3

Źródło: [Sample problems of Nurikabe puzzle: Sample problem 2, 10x10, Easy, by country mushroom](http://www.nikoli.com/en/puzzles/nurikabe/)

Problem:

```
6   2   3         3|
                   |
                  4|
                   |
        2         2|
3         5        |
                   |
3                  |
                   |
4         5   4   1|
--------------------
```

Rozwiązanie:

```
6   2   3 #   # # 3|
#   #   #          |
#           # # # 4|
# # #   #          |
        2   # #   2|
3 # #     5 # #   #|
        #          |
3 # #   # #   # #  |
          #   #    |
4 # # #   5   4   1|
--------------------
```
