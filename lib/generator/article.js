import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Article({ generate }) {

  const [inputType, setInputType] = useState('BlogPosting')
  const [inputHeadline, setInputHeadline] = useState('')
  const [inputMainEntityOfPage, setInputMainEntityOfPage] = useState('')
  const [inputImage, setInputImage] = useState('')
  const [inputImageWidth, setInputImageWidth] = useState('')
  const [inputImageHeight, setInputImageHeight] = useState('')
  const [inputDatePublished, setInputDatePublished] = useState(new Date().toISOString().split('T')[0])
  const [inputDateModified, setInputDateModified] = useState(new Date().toISOString().split('T')[0])
  const [inputAuthorName, setInputAuthorName] = useState('')
  const [inputAuthorUrl, setInputAuthorUrl] = useState('')
  const [inputPublisherName, setInputPublisherName] = useState('')
  const [inputPublisherLogo, setInputPublisherLogo] = useState('')

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = inputType
    output['headline'] = inputHeadline
    output['mainEntityOfPage'] = inputMainEntityOfPage
    output['image'] = {
      "@type": "ImageObject",
      "url": inputImage,
      "width": inputImageWidth,
      "height": inputImageHeight
    }
    output['datePublished'] = inputDatePublished;
    output['dateModified'] = inputDateModified;
    output['author'] = {
      "@type": "Person",
      "name": inputAuthorName,
    }
    if(inputAuthorUrl){
      output['author']['url'] = inputAuthorUrl
    }
    output['publisher'] = {
      "@type": "Organization",
      "name": inputPublisherName,
    }
    if(inputPublisherLogo){
      output['publisher']['logo'] = {
        "@type": "ImageObject",
        "url": inputPublisherLogo
      }
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<div itemscope itemtype="http://schema.org/` + inputType + `">
    <h2 itemprop="headline">` + inputHeadline + `</h2>
    <p itemprop="mainEntityOfPage">` + inputMainEntityOfPage + `</p>
    <meta itemprop="datePublished" content="` + inputDatePublished + `"/>
    <meta itemprop="dateModified" content="` + inputDateModified + `"/>
  <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <img itemprop="url" src="` + inputImage + `"/>
    <meta itemprop="width" content="` + inputImageWidth + `"/>
    <meta itemprop="height" content="` + inputImageHeight + `"/>
  </div>
  <div itemprop="author" itemscope itemtype="https://schema.org/Person">
    <meta itemprop="name" content="` + inputAuthorName + `"/>`;
    if(inputAuthorUrl){
      output += `<meta itemprop="url" content="` + inputAuthorUrl + `"/>`;
    }
    output += `
  </div>
  <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
    <meta itemprop="name" content="` + inputAuthorName + `"/>`;
    if(inputPublisherLogo){
      output += `<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
        <meta itemprop="url" content="` + inputPublisherLogo + `"/>
      </div>`;
    }
    output += `
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
        <label htmlFor="inputMainEntityOfPage">Główna zawartość (main entity of page)</label>
        <input type="text" id="inputMainEntityOfPage" value={inputMainEntityOfPage} onChange={e => setInputMainEntityOfPage(e.target.value)}></input>
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
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputDatePublished">Data publikacji</label>
          <input type="date" id="inputDatePublished" value={inputDatePublished} onChange={e => setInputDatePublished(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputDateModified">Data modyfikacji</label>
          <input type="date" id="inputDateModified" value={inputDateModified} onChange={e => setInputDateModified(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputAuthorName">Nazwa autora</label>
          <input type="text" id="inputAuthorName" value={inputAuthorName} onChange={e => setInputAuthorName(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputAuthorUrl">Adres URL autora</label>
          <input type="url" id="inputAuthorUrl" value={inputAuthorUrl} onChange={e => setInputAuthorUrl(e.target.value)}></input>
          {inputAuthorUrl && !validURL(inputAuthorUrl) && <p className={styles.textDanger}>Adres URL autora jest niepoprawny</p>}
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputPublisherName">Nazwa wydawcy</label>
          <input type="text" id="inputPublisherName" value={inputPublisherName} onChange={e => setInputPublisherName(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputPublisherLogo">Adres URL loga wydawcy</label>
          <input type="url" id="inputPublisherLogo" value={inputPublisherLogo} onChange={e => setInputPublisherLogo(e.target.value)}></input>
          {inputPublisherLogo && !validURL(inputPublisherLogo) && <p className={styles.textDanger}>Adres URL loga jest niepoprawny</p>}
        </div>
      </div>
    </>
  )
}
