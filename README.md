# proiect-facultate

ca sa pornesti proiectul ruleaza run.py, poti apasa si f5 

asseturi cum ar fii imaginile si fisierele css se pun in static
fisierele html se pun in templates

pentru a folosii imagini sau css, trebuie sa folosesti functia url_for() in acest still:

```
<link rel="stylesheet" href=" {{ url_for('static', filename='css/style.css')}}">
```

asa arata fara

```
<link rel="stylesheet" href="css/style.css">
```