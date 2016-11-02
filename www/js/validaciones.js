function justNumbers(e)
{
   var keynum = window.event ? window.event.keyCode : e.which;
   if (keynum == 8)
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

function justCharacter(e,flag)
{
    var keychar = window.event ? window.event.keyCode : e.which;
    if((keychar == 8) || ((keychar == 32)&&(flag == 1)))
        return true;
    return /[A-Za-z]/.test(String.fromCharCode(keychar));
}

function isSpacing(e)
{
    var key = window.event ? window.event.keyCode : e.which;
    if(key == 32)
        return true;
}