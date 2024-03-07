import axios from 'axios'

const TAGS = Object.freeze([
  'age',
  'alone',
  'amazing',
  'anger',
  'architecture',
  'art',
  'attitude',
  'beauty',
  'best',
  'birthday',
  'business',
  'car',
  'change',
  'communication',
  'computers',
  'cool',
  'courage',
  'dad',
  'dating',
  'death',
  'design',
  'dreams',
  'education',
  'environmental',
  'equality',
  'experience',
  'failure',
  'faith',
  'family',
  'famous',
  'fear',
  'fitness',
  'food',
  'forgiveness',
  'freedom',
  'friendship',
  'funny',
  'future',
  'god',
  'good',
  'government',
  'graduation',
  'great',
  'happiness',
  'health',
  'history',
  'home',
  'hope',
  'humor',
  'imagination',
  'inspirational',
  'intelligence',
  'jealousy',
  'knowledge',
  'leadership',
  'learning',
  'legal',
  'life',
  'love',
  'marriage',
  'medical',
  'men',
  'mom',
  'money',
  'morning',
  'movies',
  'success'
])
const DEFAULT_ANSWER = '🤷‍♂️🤷‍♂️🤷‍♂️'

function getCategory(question = '') {
  const lowerQuestion = question.toLowerCase()
  const questionWords = lowerQuestion.replace(/[^a-zA-Z\s]/g, '').split(' ')

  return TAGS.find((tag) => questionWords.includes(tag))
}

export function useApi() {
  const fetchQuote = async (question) => {
    if (!question) {
      return ''
    }

    const category = getCategory(question)

    if (!category) {
      return DEFAULT_ANSWER
    }

    let response

    try {
      response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        params: { category },
        headers: {
          'X-Api-Key': 'API_KEY_HERE'
        }
      })
    } catch (e) {
      console.error(e)
    }

    return response?.data?.[0].quote || DEFAULT_ANSWER
  }

  return {
    fetchQuote
  }
}
