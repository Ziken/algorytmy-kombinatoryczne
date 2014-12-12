## Zadanie 14

`14. Załóżmy, że wszystkie symbole we wzorcu P są parami różne.
Pokaż jak przyśpieszyć (czyli prosto zmodyfikować) algorytm naiwny wyszukiwania
wzorca w tekście by działał on w czasie O(n) dla n-symbolowego tekstu T.
Następnie zaimplementuj ten zmodyfikowany już algorytm. Termin 17.12 – 2pkt`


### Rozwiązanie

Przy założeniu, że wszystkie symbole we wzorcu `P` są parami różne, aby przsypieszyć algorytm naiwny do czasu `O(n)` należy podczas "przykładania" wzroca na kolejnych pozycjach w tekście `T` zapamiętywać, na której pozycji wzorzec nie zgadzał się z tekstem i zaczynać kolejne "przykładanie" od tej pozycji.

### Pseudokod

```
procedure MatchPattern (p, t)
  begin
    for i=0 to |t|-|p|+1 do
      for j=0 to |p| do
        if t[i+j]!=p[j] then
          if j>0 then i=i+j-1 else i=i+j
          break
      if j==|p| then
        wypisz i
        i=i+j-1
  end
```

### Przykład

```js
var P = "abc";
var T = "ababababcabababccccababababcabababcccc";
```

```sh
[ 6, 13, 25, 32 ]
   n = 38
T(n) = 46
```
