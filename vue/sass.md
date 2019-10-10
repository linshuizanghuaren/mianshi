# sass

## 创建和使用自定义函数

```css
@function function-name($args) {
    @return value-to-be-returned;
}
body{  
  font-size: function-name($args);
}
```

## mixin

### 定义mixin

```css
@mixin button($backgorund) {
    font-size: 1em;
    padding: 0.5em 1.0em;
    text-decoration: none;
    color: $backgorund;
}
```

### 使用mixin

```css
.button-green {
  @include button;
  background-color: green;
}
```
