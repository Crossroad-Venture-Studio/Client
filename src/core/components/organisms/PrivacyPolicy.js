// Imports.
import { pageTransitions } from '../navigation';
import Column from '../atoms/Column';
import Link from 'next/link';

// Main page.
export const PrivacyPolicy = props => {
  let {
    companyName,
    name = companyName,
    productName = name,
    product = productName,
    contactUsUrl = '/contact-us',
    className,
    children
  } = props || {}, baseClassName = 'privacy-policy';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className}>
    <span className='page-title'>Privacy policy</span>
    <br/>
    <br/>
    <i>This version of the Privacy Policy was last updated on August 28, 2023.</i>
    
    {product && product.toLowerCase() !== name.toLowerCase() && <><br/><span>{product} is a product/software created and delivered by {name}.</span><br/></> || null}

    At {name} we respect your privacy and are committed to protecting your personal data.
    This Privacy Policy will explain what data we do and do not collect, how it is disclosed,
    how it is maintained and what rights you have to modify or delete that data.
    This Privacy Policy explains how information about you is collected, used and disclosed by {name}. {name} and
    its subsidiaries provide analytics and management tools, existing analytics compliance
    patches, and services (“Services”) to engineering, business, design, and execution teams.
    As such, {name} generally does not sell its products and services directly to consumers
    or individuals. {name}, may collect and maintain personal data on
    individual persons as part of its marketing efforts directed at businesses and other organizations
    employing in need of {name} services (“Marketing Data”) and as needed to provide login access
    to persons using any web based or {name} managed version of its software tools and services (“Login Data”).
    <div id='how-we-collect-data' className='anchor-label'></div>

    <h1>
      How we collect data
    </h1>

    This Privacy Policy applies to information we collect:
    
    <ul>
      <li>
        When you interact with our website (Marketing Data).
      </li>
      <br/>
      <li>
        In email, text message, or personal contact between you and us (Marketing Data).
      </li>
      <br/>
      <li>
        From third parties, including through any application or content, including any that may
        link to or be accessible from or on our website (Marketing Data).
      </li>
      <br/>
      <li>
        When you register with us and receive a login ID to use a {name} managed or web-based
        version of our software tools and services (Login Data).
      </li>
    </ul>
    
    Please note that our website may include links to third-party websites, plug-ins and/or applications.
    Clicking on those links or enabling those connections may allow third parties to collect or share
    data about you. We do not control these third-party websites and are not responsible for their privacy
    statements. When you leave our website, we encourage you to read the privacy notice of every website
    you visit.
    <br/>
    <br/>

    <h2>
      Children under the age of 16
    </h2>
    
    <span>
      Our website and Services are not intended for children under 16 years of age.
      As such we do not knowingly collect personal information about children under 16.
      If you are under 16, do not use or provide any information on our Website or on or
      through any of its features/register on the Website, make any purchases through the
      Website, use any of the interactive or public comment features of this Website or
      provide any information about yourself to us. If we learn we have collected or
      received personal information from a child under 16 without verification of parental
      consent, we will delete that information. If you believe we might have any information
      from or about a child under 16, please <span className='text-color-ocean'><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>contact us</Link></span>.
    </span>

    <div id='what-data-we-collect-and-how-we-use-it' className='anchor-label'></div>

    <h1>
      What data we collect and how we use it
    </h1>
    <h2>
      Information you provide to us on our website
    </h2>

    This data may include, but is not restricted to the following:
    
    <ul>
      <li>
        <b>Identity data:</b> May include first name, maiden name, last name,
        current employer, job title, social media usernames/handles and/or gender and
        any other descriptive information you choose to provide.
      </li>
      <br/>
      <li>
        <b>Profile data:</b> Includes your username, your history of Services or orders
        made by you, your preferences, feedback, responses, preferences in receiving marketing
        from us and communication preferences.
      </li>
      <br/>
      <li>
        <b>Contact data:</b> Includes your mailing address, email address and telephonenumber(s).
      </li>
      <br/>
      <li>
        <b>Participation Data:</b> Includes information received through participation in any
        interactive feature of our services, surveys, contests, promotions, requests for customer
        support or information you choose to otherwise communicate with us.
      </li>
    </ul>

    <h2>
      Information you provide to us on our software
    </h2>

    This data may include, but is not restricted to the following:
    <ul>
      <li>
        <b>Identity data:</b> May include first name, last name, current employer,
        job title, and any other descriptive information you choose to provide.
      </li>
      <br/>
      <li>
        <b>Profile data:</b> Includes your username, your history of Services or orders
        made by you, your preferences, feedback, responses, preferences in receiving
        marketing from us and communication preferences.
      </li>
      <br/>
      <li>
        <b>Login data:</b> Includes your full name, username, email address and password.
      </li>
    </ul>

    <div id='information-we-collect-automatically-when-you-use-our-services' className='anchor-label'></div>

    <h1>
      Information we collect automatically when you use our services
    </h1>

    When you access or use our website, we may automatically collect, store, use,
    and/or transfer different kinds of personal data about you, including but not restricted to:
    
    <ul>
      <li>
        <b>Technical data:</b> Includes internet protocol (IP) address, your login data,
        browser type and version, time zone setting and location, access time, pages viewed,
        pages you visited, browser plug-in types and versions, operating system and platform.
      </li>
      <br/>
      <li>
        <b>Information collected by cookies and other tracking technologies:</b> We may
        use various technologies to collect information, and this may include sending cookies
        to your computer or mobile device. Cookies are small data files stored on your hard
        drive or in device memory that help us to improve our web services and your experience,
        see which areas and features of our services are popular and count visits. We may also
        collect information using web beacons (also known as 'tracking pixels'). Web beacons
        are electronic images that may be used in our emails and other communications and help
        deliver cookies, count visits, understand usage and campaign effectiveness and determine
        whether an email has been opened and acted upon. For more information about cookies, and
        how to disable them, please see 'Your Choices' below.
      </li>
      <br/>
      <li>
        <b>Information we collect from other sources:</b> We may also obtain informatio
        from other sources and combine that with information we collect directly. We may
        also collect, use and share aggregated data such as statistical or demographic data
        for any purpose. Aggregated data may be derived from your personal data but is not
        considered personal data as this data does not directly or indirectly reveal your
        identity. For example, we may aggregate your Technical Data to calculate the percentage
        of users accessing a specific website feature. However, if we combine or connect
        aggregated data with your personal data so that it can directly or indirectly identify
        you, we treat the combined data as personal data, which will be used in accordance with
        this privacy notice.
      </li>
      <br/>
      <li>
        <b>Information we collect from sub-processors:</b> A sub-processor is a third-party data
        processor engaged by {name}, who has or potentially will have access to or process
        information you provide to us or we collect automatically. {name} engages different types
        of data sub-processors to perform various functions.
      </li>
    </ul>

    <h2>
      Use of information
    </h2>

    We may use information about you for various purposes, including but not restricted to:
    <ul>
      <li>
        Provide, maintain and improve our communications and services.
      </li>
      <br/>
      <li>
        Send you technical notices, updates, security alerts and support and administrative messages;
      </li>
      <br/>
      <li>
        Respond to your comments, questions and requests and provide customer service;
      </li>
      <br/>
      <li>
        Communicate with you about products, services, offers, promotions, rewards and events offered by {name} and others.
      </li>
      <br/>
      <li>
        Monitor and analyze trends, usage and activities in connection with our Services;
      </li>
      <br/>
      <li>
        Personalize and improve our website and Services and provide content or features that match user profiles or
        interests.
      </li>
      <br/>
      <li>
        Administer and protect our business and our Website (including troubleshooting, data analysis, testing, system
        maintenance, support, reporting and hosting data).
      </li>
    </ul>

    <h2>
      Prohibited uses of information
    </h2>

    We do not and will not send spam, sell or rent your email address or any social media login account information
    to third parties. We do not disclose, sell, share, trade or give away a user's personal information to third
    parties.

    <div id='distribution-of-data' className='anchor-label'></div>

    <h1>
      Distribution of data
    </h1>
    <h2>
      Transfer of information to other countries
    </h2>

    {name} is based in the United States and the information we collect is governed
    by U.S. law. By accessing or using our website or Services or otherwise providing
    information to us, you consent to the processing and transfer of information in and
    to theU.S. and other countries for use by {name} as described in this Privacy Policy.
    If you choose to use our Services, you need to agree to our Terms andConditions, which
    set out the contract between {name} and its users. {name} engages in a number of
    international activities. In connection with the management of those activities,
    {name} may transfer information to other countries. By submitting your information to
    {name} electronically, or in connection with your interactions with {name} offline,
    you consent to such transfers and to the processing of this information in other
    countries.

    <h2>
      Sharing of Information
    </h2>

    We may share certain information about you as follows or as otherwise described in
    this Privacy Policy:

    <ul>
      <li>
        With certain trusted vendors, consultants and other service providers who need
        access to such information to carry out work on our behalf and who are bound by
        confidentiality agreements with us.
      </li>
      <br/>
      <li>
        In response to a request for information if we believe disclosure is in accordance
        with any applicable law, regulation or legal process, or as otherwise required by
        any applicable law, rule or regulation;
      </li>
      <br/>
      <li>
        If we believe your actions are inconsistent with our user agreements or policies,
        or to protect the rights, property and safety of {name} or others;
      </li>
      <br/>
      <li>
        In connection with, or during negotiations of, any merger, sale of company assets,
        financing or acquisition of all or a portion of our business by another company; and
      </li>
      <br/>
      <li>
        With your express consent or at your direction.
      </li>
    </ul>

    In addition to the other uses described in this Policy, we may extract and use
    information from the information you disclose for the purposes of aggregating data
    in a non-identifiable method. This aggregated data may be used internally to improve
    services, add new features or make refinements. In addition, this aggregated data may
    be used, without limitation, to develop, analyze, combine, or publish the aggregated
    data for commercial purposes.

    <div id='data-protection' className='anchor-label'></div>

    <h1>
      Data protection
    </h1>
    <h2>
      Data security
    </h2>

    We have put in place appropriate security measures to prevent your personal data from
    being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
    In addition, we limit access to your personal data to those employees, agents, contractors
    and other third parties who have a business need to know. They will only process your
    personal data on our instructions and they are subject to a duty of confidentiality.
    We have put in place procedures to deal with any suspected personal data breach and will
    notify you and any applicable regulator of a breach where we are legally required to do so.

    <h2>
      Data retention
    </h2>

    We will only retain your personal data for as long as necessary to fulfill the purposes
    for which it was collected, including for the purposes of satisfying any legal, accounting,
    or reporting requirements. To determine the appropriate retention eriod for personal data,
    we consider the amount, nature, and sensitivity of the personal data, the potential risk of
    harm from unauthorized use or disclosure of your personal data, the purposes for which we
    process your personal data, and whether we can achieve those purposes through other means,
    and the applicable legal requirements. In some circumstances, we may fully anonymize your
    personal data (so that it can no longer be associated with you) for research or statistical
    purposes in which case we may use this information indefinitely without further notice to you.

    <h2>
      Analytics services provided by others
    </h2>

    We may allow others to provide analytics services on our behalf. These entities may use
    cookies, web beacons and other technologies to collect information about your use of our
    Services and other websites, including your IP address, web browser, pages viewed, time
    spent on pages, links clicked and conversion information. This information may be used by
    {name} and others to, among other things, analyze and track data, determine the popularity
    of certain content, deliver content targeted to your interests and better understand your
    online activity.

    <div id='your-choice' className='anchor-label'></div>

    <h1>
      Your choice
    </h1>
    <h2>
      Account information
    </h2>

    <span>
      You may update, correct or delete information about yourself at any time. If you wish
      to do so, please <span className='text-color-ocean'><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>contact us</Link></span>,
      but note that we may retain certain
      information as required by law or for legitimate business purposes. We may also retain
      cached or archived copies of information about you for a certain period of time.
    </span>

    <h2>
      Cookies
    </h2>

    Most web browsers are set to accept cookies by default. If you prefer, you can usually
    choose to set your browser to remove or reject browser cookies. Please note that if you
    choose to remove or reject cookies, this could affect the availability and functionality
    of our Services.

    <h2>
      Promotional communications
    </h2>

    <span>
      You may opt out of receiving promotional communications from {name} by <span className='text-color-ocean'><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>contacting us</Link></span>. If you opt out,
      we may still send you non-promotional communications, such as those about your account
      or our ongoing business relations.
    </span>

    <h2>
      Access, erasure and correction
    </h2>

    The laws in the European Economic Area and certain jurisdictions outside the United States,
    require us to provide users (to the extent those laws apply to such users) with information
    related to accessing, erasure and correction. Upon request {name} will provide you with
    information about whether we hold any of your personal information. If you would like to
    review, delete or update your information, you may contact us using the contact information
    below. We will permit you to correct, amend, or delete information that is demonstrated to
    be inaccurate. We will respond to your request within a reasonable timeframe. Please note,
    because of the way we maintain certain services, after you delete or amend your information,
    residual copies may take a period of time before they are deleted from our active servers and
    may remain in our backup systems. You will need to provide sufficient identifying information,
    such as your name and email address and possible additional identifying information as a security
    precaution.

    <h2>
      Changes to this privacy policy
    </h2>

    We may change this Privacy Policy from time to time. If we make changes, we will
    notify you by revising the date at the bottom of the policy and, in some cases, we may
    provide you with additional notice (such as adding a statement to our homepage or sending
    you a notification). We encourage you to review the Privacy Policy whenever you access our
    Services to stay informed about our information practices and the ways you can help protect
    your privacy.

    {children}
  </Column>;
}


// Default export.
export default PrivacyPolicy;