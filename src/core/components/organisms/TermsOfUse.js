// Imports.
import { pageTransitions } from '../navigation';
import Column from '../atoms/Column';
import Link from 'next/link';

// Main page.
export const TermsOfUse = props => {
  let {
    companyName,
    name = companyName,
    productName = name,
    product = productName,
    contactUsUrl = '/contact-us',
    privacyPolicyUrl = '/privacy-policy',
    className,
    children
  } = props || {}, baseClassName = 'privacy-policy';
  className = className && `${baseClassName} ${className}` || baseClassName;

  // Render.
  return <Column className={className}>
    <span className='page-title width-100-percent'>Terms of use</span>
    <br/>
    <br/>
    <i>This version of the Terms of Services was last updated on August 28, 2023.</i>
    <br/>
    Welcome to the {name} Terms of Service (“Terms”).
    <br/>
    <br/>

    {product && product.toLowerCase() !== name.toLowerCase() && <><br/><span>{product} is a product/software created and delivered by {name}.</span><br/></> || null}

    <span>
      Please read these Terms carefully because they govern your use of our website/webapp/software, (the “Site”) and the
      services and products we provide. The Site and our products and services, including any of our data-inspired features and
      APIs, are collectively called the “Services”. If you have any questions, <span><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>contact us</Link></span>.
    </span>
    
    <div id='agreement-to-terms' className='anchor-label'></div>

    <h1>
      Agreement to terms
    </h1>

    By accessing, installing or using our Services, you agree to be bound by these Terms. If you do not agree
    to these Terms, you may not use the Services.

    <div id='changes-to-terms-or-services' className='anchor-label'></div>

    <h1>
      Changes to terms or services
    </h1>

    Subject to any Service Level Agreement to which we have expressly agreed with you, we may modify the Terms
    and our Services at any time, in our sole discretion. If we do so, we will notify you by posting on the Site.
    It's important that you review the Terms whenever we modify them because continuing to use the Services after
    we have posted modified Terms on the Site indicates to us that you agree to be bound by the modified Terms.
    If you don't agree to be bound by the modified Terms, then please discontinue use of the Services immediately.
    Because our Services are evolving over time we may change or discontinue all or any part of the Services, at any
    time and without notice to you, at our sole discretion. Notwithstanding the foregoing, these Terms shall apply
    unmodified for terms identified in any order form signed by you for the Services (each an“Order Form”) until
    each renewal of the term whereupon any updated terms and conditions shall apply.

    <div id='user-accounts' className='anchor-label'></div>

    <h1>
      User accounts
    </h1>
    In order to access and use the Services, you will need to create a {name} account (“Account”). By creating
    an Account you represent to us that you are thirteen (13) years or older and are not barred from using the
    Services under applicable law. By submitting information to {name} in the signup process, you expressly
    authorize us to retain certain of that information on your behalf and permit us to store such information
    for the purpose of providing and improving the Services.
    <br/>
    <br/>
    You may not use the Services under the name of another person with the intent to impersonate that person,
    or use a username that is subject to the rights of another person without appropriate authorization. You
    must be a human to use the Service and an automated account is not allowed. “Robot”(or automatic) activity
    is not allowed. We reserve the right to refuse your access to or use of the Services, in our sole discretion,
    if any information provided violates our Terms.

    <div id='feedback' className='anchor-label'></div>

    <h1>
      Feedback
    </h1>
    <span>
      We welcome feedback, comments and suggestions for improvements to the Services. You can submit feedback by
      <span><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>contacting us</Link></span>.
      You grant to use a non-exclusive, worldwide, perpetual, irrevocable, fully-paid, royalty-free, sub-licensable and transferable
      license under any and all intellectual property rights that you own or control to use, copy, modify, create
      derivative works based upon and otherwise exploit the feedback for any purpose.
    </span>
    <div id='privacy' className='anchor-label'></div>

    <h1>
      Privacy
    </h1>
    <span>
      Your privacy is important to us. Please review our Privacy Policy for information about the data we may
      collect and use. Our Privacy Policy is incorporated in these Terms, and is available <span><Link href={privacyPolicyUrl} onClick={pageTransitions.slideIn} className='link primary'>here</Link></span>.
    </span>
    <br/>
    <b>
      YOU AGREE THAT {name.toUpperCase()} MAY MONITOR YOUR USE OF THE SITE TO ENSURE QUALITY, IMPROVE THE SERVICES,
      AND TO VERIFY YOUR COMPLIANCE WITH THE TERMS.
    </b>
    <br/>
    You understand and agree that {name} may track your movement on the Site and anonymize the data for the
    purposes of quality assurance, technical support, or Service improvements. By visiting the Site, and using
    the Services, you agree to the collection and use of such data.
    <div id='content' className='anchor-label'></div>
    <h1>
      Content
    </h1>

    For purposes of these Terms: “User Content” means text, software code, algorithms, graphics, images, music,
    software, audio, video, works of authorship of any kind, and information or other materials that are posted,
    generated, provided or otherwise contributed by the Users, publicly or privately, through the Services.
    <br/>
    <br/>

    You are responsible for the User Content that you post to the Services, including its legality, reliability,
    and appropriateness. You represent to {name} that you have the necessary permissions, if any, to submit or
    generate User Content on the Site. Based on your subscription and settings, your User Content will be available
    either in public or private format for your teams viewing or by members of the {name} community.
    <br/>
    <br/>

    You represent and warrant that: (i) the Content is yours(you own it) or you have the right to use it;
    and (ii) by submitting Content, through the Services you do not violate the privacy rights, publicity rights,
    copyrights, contract rights or any other rights of any other party.
    <br/>
    <br/>

    {name} does not claim any ownership rights in any User Content that you make available through the Services
    and nothing in these Terms will be deemed to restrict any rights that you may have to use and exploit your own
    User
    Content. Notwithstanding the foregoing, you hereby grant us a non-exclusive, royalty-free, limited worldwide
    license
    to access and use the User Content in a non-identifiable manner to, without limitation, improve our services,
    make recommendations to you or other users, and/or to develop new features.
    <div id='company-content' className='anchor-label'></div>

    <h1>
      {name} content
    </h1>

    Subject to your compliance with these Terms, {name} grants you a limited, non-exclusive, non-transferable,
    non-sub licensable license to access and view our Content (“{name} Content”) solely in connection with your
    permitted use of the Services. For the purposes of these Terms, {name} Content shall include all text,
    graphics,
    images, site and screen layouts, arrangements and themes, music, software, audio, video, works of authorship by
    us
    or our affiliates of any kind, and information or other materials that are posted or generated on the Services
    by
    {name} or our affiliates.
    <br/>
    <br/>
    You only have the right to view and access {name} Content. At no time is any user permitted to:
    (i) transfer, sublicense, sell, lease, lend, rent or otherwise distribute {name} Content or the Services to
    a third party; (ii) decompile, reverse-engineer, disassemble, or create derivative works of the Services or
    any {name} Content; or (iii) use the Services or {name} Content in any unlawful manner, for any unlawful
    purpose, or in any manner inconsistent with these Terms.

    <div id='intellectual-property' className='anchor-label'></div>

    <h1>
      Intellectual property
    </h1>

    The Services contain material that may be protected by copyright, trademark and other proprietary rights,
    including, but not limited to, audio, video, graphic, photographic and text information and all {name}
    Content. {name} and any of its licensors exclusively own all right, title and interest in and to the
    Services and {name} Content, including all associated intellectual property rights. You acknowledge that
    the Services and {name} Content may be protected by copyright, trademark, and other laws of the United
    States and foreign countries. You agree not to remove, alter or obscure any copyright, trademark, service mark or other
    proprietary rights notices incorporated in or accompanying the Services and {name} Content. Further, you may
    not modify, distribute, publish, transmit, publicly display, publicly perform, participate in the transfer or sale,
    create derivative works or in any way exploit any {name} Content, in whole or in part. Any violation of
    these restrictions may result in intellectual property infringement that may subject you to civil and/or criminal
    penalties.
    You will be solely liable for any damage resulting from any infringement of copyrights, trademarks, proprietary
    rights or any other harm resulting from a submission of information protected by intellectual property rights in
    a third party, if such submission is made without express permission of the intellectual property rights holder.

    <div id='consent' className='anchor-label'></div>

    <h1>
      Consent
    </h1>

    You agree to be identified as a customer of ours and you agree that we may refer to you by name, trade name
    and trademark, if applicable, and may briefly describe your business in our marketing materials and web site.

    <div id='third-party-resources' className='anchor-label'></div>
    
    <h1>
      Third party resources
    </h1>
    
    The Services may contain links to or advertisements of third-party websites(that are not affiliated with you
    or other users), and third party programs, including open source material (collectively “Third Party
    Resources”).
    We are not responsible for Third Party Resources on or available from third party sources, and you are subject
    to the terms, conditions and/or licenses of the applicable third party(ies) in connection with your access to, use of
    or reliance on Third Party Resources. You acknowledge sole responsibility for and assume all risk arising from
    your access, use or reliance on any Third Party Resources.
    
    <div id='indemnity' className='anchor-label'></div>

    <h1>
      Indemnity
    </h1>

    You agree to defend, indemnify and hold harmless {name} and its officers, directors, employees and agents,
    from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, or expenses
    (including but not limited to attorneys' fees), to the extent allowed by applicable law, that arise from or are
    caused by: (i) your use of and access to the Services; (ii)your violation of these Terms; (iii) your violation
    of any third party right, including without limitation any copyright, property, moral or privacy right; or
    (iv) any claim that your Content caused damage to any third party. This section shall survive these Terms and
    your use and termination of the Services.

    <div id='term-and-termination' className='anchor-label'></div>

    <h1>
      Term and termination
    </h1>

    These terms shall apply for any agreed trial period, for the period paid, or for the term provided in an
    Order Form.

    <div id='warranty-disclaimers' className='anchor-label'></div>

    <h1>
      Warranty disclaimers
    </h1>
    <b>
      YOU UNDERSTAND THAT THE SITE, SERVICES AND DOCUMENTATION HAVE NOT BEEN FULLY TESTED AND MAY CONTAIN
      DEFECTS. WE MAKE NO EXPRESS OR IMPLIED REPRESENTATIONS OR WARRANTIES WHATSOEVER REGARDING ITS USE,
      PERFORMANCE, OPERATION, APPLICATIONS PORTABILITY BETWEEN SUBSEQUENT BETA VERSIONS AND FINAL VERSION OR
      SUPPORT. {name.toUpperCase()}, WITHOUT LIMITATION, MAKES NO REPRESENTATIONS OR WARRANTIES OF TITLE, NON INFRINGEMENT,
      RELIABILITY, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. THE SITE AND SERVICES ARE PROVIDED
      “AS IS” WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
    </b>

    <div id='additional-disclaimers' className='anchor-label'></div>

    <h1>
      Additional disclaimers
    </h1>
    <b>
      YOU ACKNOWLEDGE THAT {name.toUpperCase()} HAS NOT: (A) ALLOWED FULL PUBLIC ACCESS TO THE SERVICES; OR (B) PROMISED OR
      GUARANTEED TO YOU THAT THE SITE AND SERVICES SHALL BE MADE AVAILABLE TO YOU OR ANY THIRD PARTY IN THE
      FUTURE. ACCORDINGLY, YOU ACKNOWLEDGE THAT {name.toUpperCase()} MAY UNDERTAKE RESEARCH OR DEVELOPMENT TO IMPROVE THE
      SERVICES, AND YOUR CONTINUED USE OF THE SERVICES IS ENTIRELY OF YOUR OWN VOLITION. SPECIFICALLY, THE
      SERVICES MAY CONTAIN FEATURES, FUNCTIONALITY OR MODES THAT MAY NOT BE INCLUDED, AT {name.toUpperCase()}'S SOLE
      DISCRETION, IN THE PRODUCTION(NON-BETA) VERSION OF THE SERVICES OR THAT MAY BE MARKETED SEPARATELY FOR
      ADDITIONAL FEES.
    </b>

    <div id='limitation-of-liability' className='anchor-label'></div>

    <h1>
      Limitation of liability
    </h1>

    <b>
      YOU UNDERSTAND THAT THE PLATFORM MAY BE PROVIDED “AS-IS”, WITHOUT CHARGE, FOR LIMITED EVALUATION PURPOSES.
      NEITHER {name.toUpperCase()} NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SERVICES OR
      CONTENT WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST
      PROFITS, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, MOBILE DAMAGE OR SYSTEM FAILURE OR THE COST OF
      SUBSTITUTE SERVICES ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE
      THE SERVICES OR CONTENT (INCLUDING BUT NOT LIMITED TO LOSS OR UNCONSENTED TO DISCLOSURE OF DATA OR DATA BEING
      RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE SERVICES TO OPERATE WITH
      ANY OTHER PROGRAMS), WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR
      ANY OTHER LEGAL THEORY, AND WHETHER OR NOT {name.toUpperCase()} HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE,
      EVEN IF A LIMITED REMEDY SET FOR THEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
      <br/>
      <br/>
      IN NO EVENT WILL {name.toUpperCase()}'S TOTAL LIABILITY ARISING OUT OF ORIN CONNECTION WITH THESE TERMS OR FROM THE
      USE OF OR INABILITY TO USE THE SERVICES OR CONTENT EXCEED THE LESSER OF THE AMOUNTS YOU HAVE PAID TO
      {name.toUpperCase()} FOR USE OF THE SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE CAUSE OF ACTION, OR ONE
      HUNDRED DOLLARS ($100), IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO {name.toUpperCase()}, AS APPLICABLE.
    </b>

    <div id='force-majeure' className='anchor-label'></div>

    <h1>
      Force majeure
    </h1>

    We shall not be deemed to have defaulted under or breached this Agreement, for any failure or delay in
    fulfilling or performing any term of this Agreement, when and to the extent such failure or delay is caused
    by acts of God, flood, fire, explosion, war, terrorism, invasion, riot, other civil unrest, embargoes or
    blockades in effect on or after the date of this Agreement, or national or regional emergency, in each case,
    or any other such event that is outside our reasonable control.

    <div id='dispute-resolution' className='anchor-label'></div>

    <h1>
      Dispute resolution
    </h1>

    <span>
      We prefer to resolve things amicably when possible; therefore, you agree to the following dispute resolution
      policy in connection with any potential claims or disputes arising from your use of the Services.
      Start by notifying us of your dispute by <span><Link href={contactUsUrl} onClick={pageTransitions.slideIn} className='link primary'>sending us a notice</Link></span>.
    </span>
    <br/>
    <b>Informal Negotiations:</b> Parties to a dispute concerning thisAgreement, the Privacy Policy, or the use
    of the Services will attempt to informally negotiate a potential settlement or resolution to the dispute;
    <br/>
    <br/>
    <b>Binding Arbitration:</b> If for any reason arbitration is unsuccessful or unavailable to the parties,
    parties agree to submit to binding arbitration abiding by JAMS rules in the jurisdiction of the State of
    Nevada. Each party is responsible for paying their own filing, administrative and arbitrator fees.
    Judgment on the arbitration award may be entered in any court having jurisdiction thereof.
    <br/>
    <br/>

    This Agreement and all related documents are governed by, and construed in accordance with, the laws of
    the State of Nevada, without regard to the conflict of laws provisions thereof to the extent such principles
    or rules would require or permit the application of the laws of any jurisdiction other than those of the
    State of Nevada. The sole and exclusive jurisdiction and venue for any litigation arising out of this
    Agreement shall be federal or state court located in Reno, NV, and the Parties irrevocably consent
    to the personal jurisdiction of such courts. Each party acknowledges and agrees that any controversy that may
    arise under this Agreement, including any exhibits, schedules, attachments, and appendices attached to this
    Agreement, is likely to involve complicated and difficult issues and, therefore, each party irrevocably and
    unconditionally waives any right it may have to a trial by jury in respect of any legal action arising out of
    or relating to this Agreement, including any exhibits, schedules, attachments, and appendices attached to this
    Agreement, or the transactions contemplated hereby.

    <div id='entire-agreement' className='anchor-label'></div>

    <h1>
      Entire agreement
    </h1>

    These Terms (the “Agreement”) constitute the entire and exclusive understanding and agreement between
    {name} and you, except as may be provided in any OrderForm or other writing signed by the Parties. These
    Terms
    supersede and replace any and all prior oral or written understandings or agreements between us. If for any
    reason a court of competent jurisdiction finds any provision of these Terms invalid or unenforceable, that
    provision will be enforced to the maximum extent permissible and the other provisions of these Terms will remain
    in full force and effect.
    <br/>
    <br/>
    <b>
      You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written
      consent.
      Any attempt by you to assign or transfer these Terms, without such consent, will be null and of no effect.
    </b>
    <br/>
    Any notices or other communications provided by {name} under these Terms, including those regarding
    modifications
    to these Terms, will be given by us by posting to the Services.
    <br/>
    <br/>
    {name}'s failure to enforce any right or provision of these Terms will not be considered a waiver of those
    rights. The waiver of any such right or provision will be effective only if in writing and signed by a duly
    authorized representative of {name}. Except as expressly set forth in these Terms, the exercise by either
    party of any of its remedies under these Terms will be without prejudice to its other remedies under these
    Terms or otherwise.
    <br/>
    <br/>
    {children}
  </Column>;
}


// Default export.
export default TermsOfUse;