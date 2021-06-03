import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Article({ generate }) {

  const [inputType, setInputType] = useState('BlogPosting')
  const [inputHeadline, setInputHeadline] = useState('')
  const [inputImage, setInputImage] = useState('')
  const [inputImageWidth, setInputImageWidth] = useState('')
  const [inputImageHeight, setInputImageHeight] = useState('')

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = inputType
    output['headline'] = inputHeadline
    output['image'] = {
      "@type": "ImageObject",
      "url": inputImage,
      "width": inputImageWidth,
      "height": inputImageHeight
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<div itemscope itemtype="http://schema.org/` + inputType + `">
  <h2 itemprop="headline">` + inputHeadline + `</h2>
  <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <img itemprop="url" src="` + inputImage + `"/>
    <meta itemprop="width" content="` + inputImageWidth + `"/>
    <meta itemprop="height" content="` + inputImageHeight + `"/>
  </div>
</div>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputType">Typ artykułu</label>
          <select id="inputType" value={inputType} onChange={e => setInputType(e.target.value)}>
            <option>NewsArticle</option>
            <option>BlogPosting</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputHeadline">Nagłówek (do 100 znaków)</label>
          <input type="text" id="inputHeadline" value={inputHeadline} onChange={e => setInputHeadline(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="inputImage">Adres URL obrazka</label>
        <input type="url" id="inputImage" value={inputImage} onChange={e => setInputImage(e.target.value)}></input>
        {inputImage && !validURL(inputImage) && <p className={styles.textDanger}>Adres URL obrazka jest niepoprawny</p>}
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputImageWidth">Szerokość obrazka</label>
          <input type="number" min="0" id="inputImageWidth" value={inputImageWidth} onChange={e => setInputImageWidth(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputImageHeight">Wysokość obrazka</label>
          <input type="number" min="0" id="inputImageHeight" value={inputImageHeight} onChange={e => setInputImageHeight(e.target.value)}></input>
        </div>
      </div>
    </>
  )
}
