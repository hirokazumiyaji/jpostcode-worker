const path = require('path')
const fs = require('fs')

function chunk(arr, size) {
  return arr.reduce((n, _, i) => (i % size ? n : [...n, arr.slice(i, i + size)]), [])
}

async function main() {
  const dataDir = path.join(path.resolve(path.dirname(__dirname)), 'data')
  const inputDir = path.join(dataDir, 'jpostcode-data', 'data', 'json')

  const data = []

  for await (const d of await fs.promises.opendir(inputDir)) {
    const entry = path.join(inputDir, d.name)
    if (d.isDirectory()) {
      continue
    }

    const v = JSON.parse(fs.readFileSync(entry, 'utf8'))
    data.push(...Object.values(v).filter((d) => d.postcode))
  }

  data.sort((a, b) => a.postcode.localeCompare(b.postcode))

  const out = fs.openSync(path.join(dataDir, 'data.sql'), 'w')

  const s = `replace into addresses (code, prefecture, prefecture_kana, prefecture_code, city, city_kana, town, town_kana, street, office_name, office_name_kana) values`
  chunk(data, 1000).forEach((chunked, i) => {
    const v = chunked
      .map(
        (d) =>
          `('${d.postcode}', '${d.prefecture}', '${d.prefecture_kana}', ${d.prefecture_code}, '${d.city}', '${d.city_kana}', '${
            d.town
          }', '${d.town_kana}', '${d.street ?? ''}', '${d.office_name ?? ''}', '${d.office_name_kana ?? ''}')`
      )
      .join(',\n')
    if (i === 0) {
      fs.writeFileSync(out, `${s}\n${v};\n\n`)
    } else {
      fs.writeSync(out, `${s}\n${v};\n\n`)
    }
  })
}

main()
