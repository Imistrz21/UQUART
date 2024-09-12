function Copy(fromWhere) {
    let WhereFrom = fromWhere;
    let copyGfGText = document.getElementById(WhereFrom);
    copyGfGText.select();
    document.execCommand("copy");
}
