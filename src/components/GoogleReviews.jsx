import { BUSINESS } from '../data/business'
import './GoogleReviews.css'

const { rating, count, url } = BUSINESS.googleReviews

function GoogleReviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-heading">
      <div className="reviews__inner">
        <p className="reviews__eyebrow">Google</p>
        <h2 className="reviews__heading" id="reviews-heading">
          Reviews
        </h2>
        <p className="reviews__score">
          {rating}★ from {count} Google reviews
        </p>
        <a
          className="reviews__link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          See them on Google
        </a>
      </div>
    </section>
  )
}

export default GoogleReviews
