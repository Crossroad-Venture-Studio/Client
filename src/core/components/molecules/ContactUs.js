// Imports
import { useState } from 'react';
import Button from '../atoms/Button';
import Form from '../atoms/Form';
import Row from '../atoms/Row';
import Spinner from '../atoms/Spinner';
import SubmitButton from '../atoms/SubmitButton';
import asyncify from '../../../../utils/src/asyncify';

// Main component
export const ContactUs = props => {
  // Normalize input.
  let {
    request,
    uri = request,
    url = uri,
    fecthOptions,
    body: _body,
    method: _method,
    headers: _headers,
    onSubmitStart,
    onSubmit: _onSubmit = onSubmitStart,
    onSubmitEnd,
    className,
    subject,
    rows,
    message,
    ...other
  } = props || {};
  const baseName = 'contact-us';
  className = className && `${baseName} ${className}` || baseName;
  _onSubmit = typeof _onSubmit === 'function' && asyncify(_onSubmit) || null;
  onSubmitEnd = typeof onSubmitEnd === 'function' && asyncify(onSubmitEnd) || null;
  const { headers = _headers, body = _body, method = _method } = fecthOptions || (fecthOptions = {});
  fecthOptions = {
    ...fecthOptions,
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    }
  };

  // States.
  const [{ processing, msg, error }, setState] = useState({});

  // Submit callback.
  const onSubmit = async data => {
    setState({ processing: true, msg });
    const options = {
      ...fecthOptions,
      body: JSON.stringify({...(data || {}), ...(body || {})})
    },
    response = url && (
      _onSubmit ? await _onSubmit(url, options) : await fetch(url, options)
    ) || (
      _onSubmit ? await _onSubmit(options) : await fetch(options)
    ) || { ok: false, status: 'bad input or bad onSubmit' };

    if (response.ok) {
      const json = await response.json();
      onSubmitEnd && await onSubmitEnd({ async json(){ return json; }, ok: response.ok });
      setState({ processing: false, msg: json.message || '✔︎ message sent' });
    } else {
      onSubmitEnd && await onSubmitEnd({ status: response.status || '✗ message not sent', ok: response.ok });
      setState({ processing: false, error: response.status });
    }
  };

  // Rendering.
  return <Form className={className} onSubmit={onSubmit} {...other}>
    <input className='contact-us-name' name='name' placeholder='name...' required />
    <input className='contact-us-email' name='email' placeholder='e-mail address...' required />
    <input className='contact-us-subject' name='subject' placeholder='subject...' initialValue={subject} />
    <textarea
      className='contact-us-message'
      rows={Math.max(rows || 0, 1)}
      name='message'
      placeholder='type your message here...'
      initialValue={message} required
    />
    {msg && <Row>
      <span className='contact-us-success-message'>{msg}</span>
      <Button className='contact-us-reset-button'>Send new message</Button>
    </Row>}
    {error && <Row>
      <span className='contact-us-error-message'>{error}</span>
      <Button className='contact-us-reset-button'>Retry</Button>
    </Row>}
    {!(msg || error || processing) && <SubmitButton className='contact-us-submit-button'>Send</SubmitButton>}
    {processing && <Spinner />}
  </Form>
}

// Default export.
export default ContactUs;