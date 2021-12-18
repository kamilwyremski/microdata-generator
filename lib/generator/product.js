import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Product({ generate }) {

  const oneReview = {
    'author': '',
    'datePublished': '',
    'reviewBody': '',
    'name': '',
    'ratingValue': ''
  }

  const [inputName, setInputName] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [inputImage, setInputImage] = useState('')
  const [inputBrand, setInputBrand] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [inputSku, setInputSku] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [inputCurrency, setInputCurrency] = useState('PLN')
  const [inputPriceValidUntil, setInputPriceValidUntil] = useState('')
  const [inputAvailability, setInputAvailability] = useState('InStock')
  const [inputCondition, setInputCondition] = useState('NewCondition')
  const [inputAggregateRating, setInputAggregateRating] = useState('')
  const [inputNumberOfRatings, setInputNumberOfRatings] = useState('')
  const [inputRatingHighest, setInputRatingHighest] = useState('')
  const [inputRatingLowest, setInputRatingLowest] = useState('')
  const [reviews, setReviews] = useState([])

  const addReview = () => {
    setReviews([
      ...reviews,
      oneReview
    ])
  }

  const removeReview = (index) => {
    let newArray = [...reviews]
    newArray.splice(index, 1)
    setReviews(newArray)
  }

  const updateReview = (index, field, newValue) => {
    let newArray = [...reviews]
    newArray[index][field] = newValue
    setReviews(newArray)
  }

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = "Product"
    output['name'] = inputName
    output['url'] = inputUrl
    output['image'] = inputImage
    output['brand'] = inputBrand
    output['description'] = inputDescription
    output['sku'] = inputSku
    output['offers'] = {
      "@type": "Offer",
      "priceCurrency": inputCurrency,
      "price": inputPrice,
      "priceValidUntil": inputPriceValidUntil,
      "availability": "http://schema.org/" + inputAvailability,
      "itemCondition": "http://schema.org/OUsedCondition" + inputCondition
    }
    output['aggregateRating'] = {
      "@type": "AggregateRating",
      "ratingValue": inputAggregateRating,
      "bestRating": inputRatingHighest,
      "worstRating": inputRatingLowest,
      "ratingCount": inputNumberOfRatings
    }
    if(reviews){
      output['review'] = []
      reviews.forEach((review) => {
        const item = {
          "@type": "Review",
          "author": review.author,
          "datePublished": review.datePublished,
          "reviewBody": review.reviewBody,
          "name": review.name,
          "reviewRating": {
            "@type": "Rating",
            "bestRating": inputRatingHighest,
            "ratingValue": review.ratingValue,
            "worstRating": inputRatingLowest
          }
        }
        output['review'].push(item)
      })
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<div itemscope itemtype="http://schema.org/Product">
  <h3 itemprop="name">` + inputName + `</h3>
  <a href="` + inputUrl + `" itemprop="url">` + inputUrl + `</a>
  <img src="` + inputImage + `" itemprop="image">
  <meta itemprop="brand" content="` + inputBrand + `"/>
  <p itemprop="description">` + inputDescription + `"</p>
  <meta itemprop="sku" content="` + inputSku + `"/>
  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <p><span itemprop="price">` + inputPrice + `</span> <span itemprop="priceCurrency">` + inputCurrency + `</span></p>
    <meta itemprop="priceValidUntil" content="` + inputPriceValidUntil + `"/>
    <meta itemprop="url" content="` + inputUrl + `"/>
    <meta itemprop="availability" content="` + inputAvailability + `"/>
    <meta itemprop="itemCondition" content="` + inputCondition + `"/>
  </div>
  <div itemprop="AggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
    <meta itemprop="ratingValue" content="` + inputAggregateRating + `"/>
    <meta itemprop="bestRating" content="` + inputRatingHighest + `"/>
    <meta itemprop="worstRating" content="` + inputRatingLowest + `"/>
    <meta itemprop="ratingCount" content="` + inputNumberOfRatings + `"/>
  </div>`;

  reviews.forEach((review) => {
    output += `   <div itemprop="review" itemscope itemtype="https://schema.org/Review">
    <span itemprop="name">${review.name}</span> -
    by <span itemprop="author">${review.author}</span>,
    <meta itemprop="datePublished" content="${review.datePublished}">${review.datePublished}
    <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
      <meta itemprop="worstRating" content = "${inputRatingLowest}"/>
      <span itemprop="ratingValue">${review.ratingValue}</span>/
      <span itemprop="bestRating">${inputRatingHighest}</span>stars
    </div>
    <span itemprop="reviewBody">${review.reviewBody}</span>
  </div>\r\n`
  })

    output += `</div>`;
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputName">Nazwa produktu</label>
          <input type="text" id="inputName" value={inputName} onChange={e => setInputName(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputUrl">Adres URL</label>
          <input type="url" id="inputUrl" value={inputUrl} onChange={e => setInputUrl(e.target.value)}></input>
          {inputUrl && !validURL(inputUrl) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputImage">Adres URL obrazka</label>
          <input type="url" id="inputImage" value={inputImage} onChange={e => setInputImage(e.target.value)}></input>
          {inputImage && !validURL(inputImage) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputBrand">Nazwa marki</label>
          <input type="text" id="inputBrand" value={inputBrand} onChange={e => setInputBrand(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="inputDescription">Opis produktu</label>
        <textarea id="inputDescription" value={inputDescription} onChange={e => setInputDescription(e.target.value)}></textarea>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputSku">SKU</label>
          <input type="text" id="inputSku" value={inputSku} onChange={e => setInputSku(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputPrice">Cena</label>
          <input type="number" min="0" step="0.01" id="inputPrice" value={inputPrice} onChange={e => setInputPrice(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputCurrency">Waluta (3 znakowy kod)</label>
          <input type="text" maxLength="3" id="inputCurrency" value={inputCurrency} onChange={e => setInputCurrency(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputPriceValidUntil">Cena ważna do</label>
          <input type="date" id="inputPriceValidUntil" value={inputPriceValidUntil} onChange={e => setInputPriceValidUntil(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputAvailability">Dostępność</label>
          <select id="inputAvailability" value={inputAvailability} onChange={e => setInputAvailability(e.target.value)}>
            <option value="InStock">In Stock</option>
            <option value="OutOfStock">Out of stock</option>
            <option value="OnlineOnly">Online only</option>
            <option value="InStoreOnly">In store only</option>
            <option value="PreOrder">Pre-order</option>
            <option value="PreSale">Pre-Sale</option>
            <option value="LimitedAvailability">Limited availability</option>
            <option value="SoldOut">Sold out</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputCondition">Stan produktu</label>
          <select id="inputCondition" value={inputCondition} onChange={e => setInputCondition(e.target.value)}>
            <option value="NewCondition">Nowy</option>
            <option value="OUsedCondition">Używany</option>
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputAggregateRating">Średnia ocena</label>
          <input type="number" min="0" step="0.01" id="inputAggregateRating" value={inputAggregateRating} onChange={e => setInputAggregateRating(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputNumberOfRatings">Ilość ocen</label>
          <input type="number" min="0" id="inputNumberOfRatings" value={inputNumberOfRatings} onChange={e => setInputNumberOfRatings(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputRatingHighest">Najwyższa możliwa ocena</label>
          <input type="number" min="0" id="inputRatingHighest" value={inputRatingHighest} onChange={e => setInputRatingHighest(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputRatingLowest">Najniższa możliwa ocena</label>
          <input type="number" min="0" id="inputRatingLowest" value={inputRatingLowest} onChange={e => setInputRatingLowest(e.target.value)}></input>
        </div>
      </div>
      {reviews.map((review, index) => {
        return <div key={index}>
          <label>Opinia {index+1}</label>
          <div className={styles.grid}>
            <div className={styles.formGroup} >
              <label htmlFor={"reviewAuthor" + index}>Autor</label>
              <input type="text" value={review.author} onChange={e => updateReview(index, 'author', e.target.value)} placeholder="Autor" id={"reviewAuthor" + index}></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={"reviewDatePublished" + index}>Data publikacji</label>
              <input type="date" value={review.datePublished} onChange={e => updateReview(index, 'datePublished', e.target.value)} placeholder="Data publikacji" id={"reviewDatePublished" + index}></input>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor={"reviewName" + index}>Nazwa opinii</label>
              <input type="text" value={review.name} onChange={e => updateReview(index, 'name', e.target.value)} placeholder="Nazwa opinii" id={"reviewName" + index}></input>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={"ratingValue" + index}>Ocena</label>
              <input type="number" max={inputRatingHighest} min={inputRatingLowest} value={review.ratingValue} onChange={e => updateReview(index, 'ratingValue', e.target.value)} placeholder="Ocena" id={"ratingValue" + index}></input>
            </div>
          </div>
          <div className={styles.formGroup} >
            <label htmlFor={"reviewBody" + index}>Treść opinii</label>
            <textarea value={review.reviewBody} onChange={e => updateReview(index, 'reviewBody', e.target.value)} placeholder="Treść opinii" id={"reviewBody" + index}></textarea>
          </div>

          <button className={styles.btn} onClick={() => removeReview(index)}>Usuń opinię</button>
        </div>
      })}
      <button className={styles.btn} onClick={() => addReview()}>Dodaj nową opinie (Review)</button>
    </>
  )
}
