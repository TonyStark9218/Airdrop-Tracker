const generatedIds = new Set<string>()

export const createUniqueId = (): string => {
  const timestamp = Date.now().toString(36) // Konversi waktu sekarang ke basis 36
  const randomString = Math.random().toString(36).substring(2, 10) // 8 karakter acak
  const id = `${timestamp}-${randomString}`

  // Pastikan ID unik
  if (generatedIds.has(id)) {
    return createUniqueId() // Rekursi jika ID duplikat
  }

  generatedIds.add(id)
  return id
}

export const toTitleCase = (text: string) => {
  return text
    .toLowerCase() // Ubah semua huruf menjadi huruf kecil
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Huruf pertama tiap kata menjadi kapital
}
