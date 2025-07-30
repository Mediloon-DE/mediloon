import Link from 'next/link';
import React from 'react'

const LiabilityPage = () => {
  return (
    <div className='flex flex-col py-10 gap-10 max-w-[1040px] mx-auto'>
      <h1 className='text-2xl font-semibold'>Use and liability</h1>
      <p className='text-sm text-gray-800'>
        All information on our website has been researched with care. However, we cannot guarantee the timeliness, accuracy, or completeness of the information provided. The information on medical indications, medications, and treatment methods contained on this website is not intended or suitable as a substitute for medical advice.
      </p>
      <div className='flex flex-col gap-8'>
        <h2 className='text-xl font-semibold'>1. Content of the online offer</h2>
        <p className='text-sm text-gray-800'>
          All offers are subject to change and non-binding. We expressly reserve the right to change, supplement, or delete parts of the pages or the entire offer without prior notice, or to temporarily or permanently discontinue publication.
        </p>
        <h2 className='text-xl font-semibold'>2. References and links</h2>
        <p className='text-sm text-gray-800'>
          Our website may contain links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the respective website is always responsible for the content of the linked pages. Upon notification of any legal violations, we will remove such links immediately.
        </p>
        <h2 className='text-xl font-semibold'>3. Copyright and trademark law</h2>
        <p className='text-sm text-gray-800'>
          The content and works created by us on this website are subject to copyright and trademark law, where applicable and unless otherwise stated. Reproduction, processing, distribution, and any type of exploitation outside the limits of copyright and trademark law require the written consent of the respective author or creator. Downloads and copies of this website are permitted for private, non-commercial use only. To the extent that the content on this website was not created by us, the copyright and trademark rights of third parties are observed. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright or trademark infringement, please notify us accordingly. Upon notification of any violations, we will remove such content immediately.
        </p>
        <h2 className='text-xl font-semibold'>4. Disclaimer (liability for content in general):</h2>
        <p className='text-sm text-gray-800'>
          The content and works.....
        </p>
        <h2 className='text-xl font-semibold'>3. Copyright and trademark law</h2>
        <p className='text-sm text-gray-800'>
          As a service provider, we are liable for our own content in accordance with Section 7, Paragraph 1 of the German Telemedia Act (TMG). However, according to Sections 8 to 10 of the German Telemedia Act (TMG), we are not obligated to monitor submitted and stored third-party information for legality or to investigate circumstances that indicate illegal activity. Legal obligations to remove information or block the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Upon knowledge of violations of law, we will remove the relevant content immediately.

        </p>
        <h2 className='text-xl font-semibold'>5. Disclaimer (forum posts, product reviews, dealer reviews):</h2>
        <p className='text-sm text-gray-800'>
          At mediloon.com, we operate a forum where users can post personal product reviews. Reviews are published in the following format: &quot;First name + first letter of last name.&quot; For example: John Doe {">"} John M.
        </p>
        <p className='text-sm text-gray-800'>
          The forum is intended solely for the exchange of ideas and experiences among our users for purely informational purposes. Forum posts can in no way replace individual and professional advice from a doctor or pharmacist. In particular, the content of the forum is not intended to provide medical advice or information about medications or specific illnesses. Forum posts cannot and may not be used for making diagnoses or for selecting and applying treatment methods.
        </p>
        <p className='text-sm text-gray-800'>
          Therefore, if you have any health problems, always consult a doctor or pharmacist!
        </p>
        <p className='text-sm text-gray-800'>
          The forum posts reflect solely the personal opinion of the respective author. We have no influence whatsoever on the form and content of the reviews. The forum posts do not necessarily reflect our opinion, nor do we adopt the content of the forum posts as our own. Therefore, we assume no responsibility for the form and content of the forum posts or for the user IDs used, and exclude any liability for this.
        </p>
        <p className='text-sm text-gray-800'>
          Should a product review violate laws, third-party rights, or our <Link href={'/#'} className='underline'>product review guidelines</Link> , those affected have the opportunity to notify us at any time. We will then review the content using the resources available to us and take further action if necessary. A product review will only be deleted if we determine a violation.
        </p>
        <p className='text-sm text-gray-800'>
          Please also note that unlawful reviews may be punishable in individual cases and that by posting such an unlawful review you may also be liable for damages to the person affected and/or us.
        </p>
        <p className='text-sm text-gray-800'>
          It is also possible to rate retailers on our platform. The same rules apply to these retailer ratings as described above for product reviews. Further information on retailer ratings can be found in our <Link href={'/#'} className='underline'>Retailer Rating Guidelines</Link> .
        </p>
          
        <h2 className='text-xl font-semibold'>6. Prohibition of unsolicited contact (spam)</h2>
        <p className='text-sm text-gray-800'>
          The use of contact information published in the imprint or similar information, such as postal addresses, telephone and fax numbers, and email addresses, by third parties to send unsolicited information is prohibited. Legal action against senders of so-called spam emails in the event of violations of this prohibition is expressly reserved.
        </p>
        <h2 className='text-xl font-semibold'>7. Unauthorized access to our website</h2>
        <p className='text-sm text-gray-800'>
          The content of our website is intended solely for the information of our customers. This content may not be extracted, reused, integrated into another website, linked, and/or otherwise connected, in whole or in part, without our written permission. The use of data mining, robots, grabbing, scraping, and/or similar data gathering and extraction tools and techniques is prohibited.
        </p>
        <p className='text-sm text-gray-800'>
          Activities intended to compromise our website are prohibited. In particular, no actions may be taken that could result in an unreasonable or excessive load on our website&apos;s infrastructure. Blocking, overwriting, or modifying content generated by us, or otherwise disrupting the website, is permitted.
        </p>
      </div>
    </div>
  )
}

export default LiabilityPage;