const reticencias = (
  str,
  maxLength,
  { side = 'end', ellipsis = '...' } = {}
) => {
  if (str.length > maxLength) {
    switch (side) {
      case 'start':
        return ellipsis + str.slice(-(maxLength - ellipsis.length))
      case 'end':
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis
    }
  }
  return str
}

export default reticencias
