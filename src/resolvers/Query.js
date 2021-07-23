function feed(parent, args, cotext, info) {
    return AudioContext.prisma.link.findMany()
}

module.exports = {
    feed,
}