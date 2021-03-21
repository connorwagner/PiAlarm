export interface Led {
  color: string;
  brightness: number;
}

export interface Leds {
  red: number;
  green: number;
  blue: number;
  white: number;
}

export const mapLedsFromObject = (response: Leds): Led[] =>
  Object.entries(response)
    .map(([key, value]) => ({ color: key, brightness: value }));

export const mapLedsToObject = (leds: Led[]): Leds => {
  const red = leds.find(led => led.color.toLowerCase() === 'red')?.brightness ?? 0;
  const green = leds.find(led => led.color.toLowerCase() === 'green')?.brightness ?? 0;
  const blue = leds.find(led => led.color.toLowerCase() === 'blue')?.brightness ?? 0;
  const white = leds.find(led => led.color.toLowerCase() === 'blue')?.brightness ?? 0;

  return { red, green, blue, white };
}
