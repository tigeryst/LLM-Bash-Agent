import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq()

export async function POST(request: Request) {
  const { prompt } = await request.json()
  console.log({ prompt })
  try {
    //openai|groq|antrhopic
    const completion = await groq.chat.completions.create({
      // messages: [
      //   {
      //     role: 'system',
      //     content: `
      //     ให้ extract ข้อมูลจากข้อความและ output format ให้ถูกกต้อง​

      //     ข้อมูลที่ต้องการ extract คือ Job Title, Company, Location in JSON format inside <div> tag​

      //     <div>

      //     ...JSON

      //     </div>
      //     Input: job description
      //     `,
      //   },
      //   {
      //     role: 'user',
      //     content: `
      //     Input: Job Title: Digital Marketing Specialist

      //     Job Description:

      //     We are seeking a dynamic and motivated Digital Marketing Specialist to join our growing team. The ideal candidate will have a strong understanding of the digital marketing landscape, including SEO, SEM, social media, email marketing, and content marketing.

      //     Company name is Naruto Co., Ltd.
      //     Located in Konoha Village.

      //     Responsibilities:

      //     1. Develop and implement comprehensive digital marketing strategies to increase brand awareness and drive lead generation.
      //     2. Manage SEO and SEM campaigns to improve search engine rankings and drive organic and paid traffic to the company's website.
      //     3. Create engaging content for social media platforms, blogs, and email campaigns.
      //     4. Analyze website and campaign performance using tools like Google Analytics, and provide reports with actionable insights.
      //     5. Collaborate with cross-functional teams to align marketing efforts with business goals.

      //     Qualifications:

      //     1. Bachelor's degree in Marketing, Business, or a related field.
      //     2. Proven experience in digital marketing.
      //     3. Excellent understanding of SEO, SEM, and social media marketing.
      //     4. Strong analytical skills and experience with Google Analytics.
      //     5. Excellent communication and teamwork skills.

      //     This is a full-time position with competitive salary and benefits. If you are a creative problem solver with a passion for digital marketing, we would love to hear from you!
      //     `,
      //   },
      //   {
      //     role: 'assistant',
      //     content: `
      //     <div>
      //     {
      //         "Job Title": "Digital Marketing Specialist",
      //         "Company": "Naruto Co., Ltd.",
      //         "Location": "Konoha Village"
      //     }
      //     </div>
      //     `,
      //   },
      //   {
      //     role: 'user',
      //     content: prompt,
      //   },
      // ],
      messages: [
        {
          role: 'system',
          content: 'You are a bash script generator ',
        },
        {
          role: 'user',
          content: 'Install nextjs',
        },
        {
          role: 'assistant',
          content: `Bash script: 
          #!/bin/bash
          npx create-next-app@latest my-next-app
          cd my-next-app
          npm run dev
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      // model: "gpt-4o",
      model: 'llama3-70b-8192',
      temperature: 0.2,
      max_tokens: 8192,
      top_p: 0.2,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['Observation'],
    })

    console.log(completion.choices[0])
    const answer = completion.choices[0].message.content
    return NextResponse.json({ output: answer })
  } catch (error: any) {
    return NextResponse.json({ output: error.message }, { status: 500 })
  }
}
