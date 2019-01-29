export default function () {
    let {
        protocol,
        host,
        pathname,
        hash,
        search
    } = window.location;
    if (search !== '') {
        window.location.href = decodeURIComponent([protocol, '//', host, pathname, hash, search].join(''))
    }
}
