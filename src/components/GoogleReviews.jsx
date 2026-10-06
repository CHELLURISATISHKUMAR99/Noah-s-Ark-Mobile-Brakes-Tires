import './GoogleReviews.css'

/**
 * The owner has a Google Business Profile, but the public URL is not in the
 * repo yet. Leave VITE_GOOGLE_BUSINESS_URL blank until they share it. Never
 * invent a rating, a review count, or a quote.
 */
function googleBusinessUrl() {
  const value = import.meta.env.VITE_GOOGLE_BUSINESS_URL
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!/^https:\/\/\S+$/i.test(trimmed)) return ''
  return trimmed
}

function GoogleReviews() {
  const url = googleBusinessUrl()

  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-heading">
      <div className="reviews__inner">
        <p className="reviews__eyebrow">Google</p>
        <h2 className="reviews__heading" id="reviews-heading">
          Reviews
        </h2>
        {url ? (
          <>
            <p className="reviews__copy">
              Reviews are on Google. This page does not show a star rating or
              quotes.
            </p>
            <a className="reviews__link" href={url}>
              See the Google Business Profile
            </a>
          </>
        ) : (
          <p className="reviews__copy">
            The shop’s Google Business Profile will be linked here. This page
            does not show a star rating or review quotes.
          </p>
        )}
      </div>
    </section>
  )
}

export default GoogleReviews
