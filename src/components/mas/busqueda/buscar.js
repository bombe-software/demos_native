export function validadoAcentos (s) {
    var mapaAcentos = {
        'á':'A', 'é':'E', 'í':'I','ó':'O','ú':'U',
        'Á':'A', 'É':'E', 'Í':'I','Ó':'O','Ú':'U'
        };
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
    }
    return ret;
};