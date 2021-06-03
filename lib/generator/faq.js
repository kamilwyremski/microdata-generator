import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Breadcrumbs({ generate }) {

  const oneFaq = {
    'question': '',
    'answer': '',
  }

  const [inputUrl, setInputUrl] = useState('')
  const [faqs, setFaqs] = useState([oneFaq])

  const addFaq = () => {
    setFaqs([
      ...faqs,
      oneFaq
    ])
  }

  const removeFaq = (index) => {
    let newArray = [...faqs]
    newArray.splice(index, 1)
    setFaqs(newArray)
  }

  const updateFaqQuestion = (index, newValue) => {
    let newArray = [...faqs]
    newArray[index]['question'] = newValue
    setFaqs(newArray)
  }

  const updateFaqAnswer = (index, newValue) => {
    let newArray = [...faqs]
    newArray[index]['answer'] = newValue
    setFaqs(newArray)
  }

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = "FAQPage"
    if(inputUrl){
      output['@id'] = inputUrl
    }
    if(faqs){
      output['mainEntity'] = []
      faqs.forEach((faq) => {
        const item = {
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }
        output['mainEntity'].push(item)
      })
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<div itemscope itemtype="http://schema.org/FAQPage">\r\n`;
    faqs.forEach((faq, index) => {
      output += `  <div itemprop="mainEntity" itemscope itemtype="http://schema.org/Question">
    <p itemprop="name">` + faq.question + `</p>
    <div itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
      <p itemprop="text">` + faq.answer + `</p>
    </div>
  </div>\r\n`
    })
    output += `</div>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="inputUrl">FAQ URL</label>
        <input type="url" id="inputUrl" value={inputUrl} onChange={e => setInputUrl(e.target.value)}></input>
        {inputUrl && !validURL(inputUrl) && <p className={styles.textDanger}>Adres URL jest niepoprawny</p>}
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          {faqs.map((inputFaq, index) => {
            return <div key={index}>
              <label>Pytanie {index+1}</label>
              <div className={styles.formGroup} >
                <input type="text" value={inputFaq.question} onChange={e => updateFaqQuestion(index, e.target.value)} placeholder="Pytanie"></input>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.gridNoWrap}>
                  <input type="text" value={inputFaq.answer} onChange={e => updateFaqAnswer(index, e.target.value)} placeholder="Odpowiedź"></input>
                  {index>0 &&
                    <button className={styles.btn} onClick={() => removeFaq(index)}>Usuń</button>
                  }
                </div>
              </div>
            </div>
          })}
          <button className={styles.btn} onClick={() => addFaq()}>Dodaj nowe FAQ</button>
        </div>
      </div>
    </>
  )
}
