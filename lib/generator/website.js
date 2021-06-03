import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Website({ generate }) {

  const [inputWebsiteName, setinputWebsiteName] = useState('')
  const [inputWebsiteAlternateName, setInputWebsiteAlternateName] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [inputUrlSearch, setInputUrlSearch] = useState('')
  const [inputStringInSearch, setInputStringInSearch] = useState('')

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = "WebSite"
    output['name'] = inputWebsiteName
    if(inputWebsiteAlternateName){
      output['alternateName'] = inputWebsiteAlternateName
    }
    output['url'] = inputUrl
    if(inputUrlSearch){
      output['potentialAction'] = {
        "@type": "SearchAction",
        "target": inputUrlSearch + "{" + (inputStringInSearch ? inputStringInSearch : "search_term_string") + "}",
        "query-input": "required name=" + (inputStringInSearch ? inputStringInSearch : "search_term_string")
      }
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<div itemscope itemtype="http://schema.org/WebSite">
  <meta itemprop="name" content="` + inputWebsiteName + `"/>\r\n`;
    if(inputWebsiteAlternateName){
      output += `  <meta itemprop="alternateName" content="` + inputWebsiteAlternateName + `"/>\r\n`
    }
    output += `<link itemprop="url" href="` + inputUrl + `"/>\r\n`
    if(inputUrlSearch){
      output += `  <form itemprop="potentialAction" itemscope itemtype="http://schema.org/SearchAction">
    <meta itemprop="target" content="` + inputUrlSearch + `{` + (inputStringInSearch ? inputStringInSearch : "search_term_string") + `}"/>
    <input itemprop="query-input" type="text" name="` + (inputStringInSearch ? inputStringInSearch : "search_term_string") + `" required/>
    <input type="submit"/>
  </form>\r\n`
    }
    output += `</div>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputWebsiteName">Nazwa strony</label>
          <input type="text" id="inputWebsiteName" value={inputWebsiteName} onChange={e => setinputWebsiteName(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputWebsiteAlternateName">Alternatywna nazwa</label>
          <input type="text" id="inputWebsiteAlternateName" value={inputWebsiteAlternateName} onChange={e => setInputWebsiteAlternateName(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="inputUrl">Adres URL</label>
        <input type="url" id="inputUrl" value={inputUrl} onChange={e => setInputUrl(e.target.value)}></input>
        {inputUrl && !validURL(inputUrl) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="inputUrlSearch">Adres URL do wyszukiwania w witrynie wewnętrznej (przed query)</label>
        <input type="url" id="inputUrlSearch" value={inputUrlSearch} onChange={e => setInputUrlSearch(e.target.value)}></input>
        {inputUrlSearch && !validURL(inputUrlSearch) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputStringInSearch">Opcjonalnie: ciąg znaków w wyszukiwanym adresie URL występujący po zapytaniu</label>
          <input type="text" id="inputStringInSearch" value={inputUrlSearch ? inputStringInSearch : ""} onChange={e => setInputStringInSearch(e.target.value)}  disabled = { inputUrlSearch ? "" : "disabled"}></input>
        </div>
      </div>
    </>
  )
}
