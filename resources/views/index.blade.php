<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ТТИТ</title>
    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script defer src="{{ mix('js/app.js') }}"></script>
</head>

<body>
<!-- React root DOM -->
<div id="index"></div>
</body>
</html>
