## Zadanie 3

`Skonstruować i ew. zaimplementować nierekurencyjną wersję algorytmu 7. (4 pkt) – 29.10`

### Algorytm 7

Pseudokod:

```
procedute PERM(m)
begin
  if m = 1 then WYPISZ(PI[1], ... ,PI[n])
  else
    for i=1 to m do
      PERM(m-1)
      if i < m then PI[ B(m,i) ] <-> PI[m]
end;

function B(m,i)
begin
  if ( (m mod 2 = 0) and (m > 2) ) then
    if i < (m-1) then B <- i
    else B <- m-2
  else B <- m-1
end;

//program główny
begin
  for i=1 to n do PI[i] = i
  PERM(n)
end;
```
