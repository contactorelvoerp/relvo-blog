function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function hypotrochoid(R: number, r: number, d: number, steps = 400): string {
  const g = gcd(Math.round(R), Math.round(r))
  const totalAngle = Math.PI * 2 * (r / g)
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * totalAngle
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return pts.join(' ') + ' Z'
}
