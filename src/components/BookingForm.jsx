import React, { useState, useEffect } from 'react';
import { CalendarCheck, ChevronRight, RefreshCw, CheckCircle } from 'lucide-react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'general',
    date: '',
    timeSlot: '11:00-13:00',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handlePrefill = (e) => {
      if (e.detail) {
        setFormData((prev) => ({
          ...prev,
          service: e.detail.service || 'general',
          notes: e.detail.notes || ''
        }));
      }
    };
    window.addEventListener('prefillBooking', handlePrefill);
    return () => {
      window.removeEventListener('prefillBooking', handlePrefill);
    };
  }, []);

  const services = [
    { value: 'general', label: 'General Check-up & Consultation' },
    { value: 'cosmetic', label: 'Smile Designing & Veneers' },
    { value: 'implants', label: 'Dental Implants & Rehabilitation' },
    { value: 'prosthetic', label: 'Maxillofacial Prosthetics (Eye, Ear, Nose)' },
    { value: 'tmd', label: 'TMD / TMJ Jaw Joint Consultation' },
    { value: 'cleaning', label: 'Scaling & Whitening' }
  ];

  const timeSlots = [
    { value: '11:00-13:00', label: 'Morning (11:00 AM - 01:00 PM)' },
    { value: '13:00-15:00', label: 'Early Afternoon (01:00 PM - 03:00 PM)' },
    { value: '16:00-18:00', label: 'Late Afternoon (04:00 PM - 06:00 PM)' },
    { value: '18:00-20:00', label: 'Evening (06:00 PM - 08:00 PM)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    // Phone validation
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      service: 'general',
      date: '',
      timeSlot: '11:00-13:00',
      notes: ''
    });
    setIsSubmitted(false);
  };

  // Get current date in YYYY-MM-DD for min date attribute
  const getTodayString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section id="booking" className="booking-section section-padding">
      <div className="container booking-container">
        <div className="booking-card animate-fade-in">
          {!isSubmitted ? (
            <>
              <div className="booking-header">
                <span className="section-tag">Easy Scheduling</span>
                <h2 className="booking-title">Book Your Appointment</h2>
                <p className="booking-desc">
                  Fill in your details below to request a preferred consultation slot. Our clinic 
                  coordinator will call you to finalize and confirm your slot.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row">
                  <div className="form-group col-6">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-control ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group col-6">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-control ${errors.phone ? 'input-error' : ''}`}
                      placeholder="e.g. 9876543210"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-12">
                    <label className="form-label" htmlFor="service">Treatment Needed</label>
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleInputChange}
                      className="form-control select-control"
                    >
                      {services.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-6">
                    <label className="form-label" htmlFor="date">Preferred Date *</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={formData.date}
                      min={getTodayString()}
                      onChange={handleInputChange}
                      className={`form-control ${errors.date ? 'input-error' : ''}`}
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="form-group col-6">
                    <label className="form-label" htmlFor="timeSlot">Preferred Time Slot *</label>
                    <select 
                      id="timeSlot" 
                      name="timeSlot" 
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="form-control select-control"
                    >
                      {timeSlots.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">Additional Comments / Symptoms (Optional)</label>
                  <textarea 
                    id="notes" 
                    name="notes" 
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="form-control textarea-control"
                    placeholder="Briefly describe what you are experiencing (e.g. wisdom tooth pain, dental crown damage, facial prosthetic consultation)"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-secondary btn-submit">
                  <CalendarCheck size={18} />
                  <span>Request Preferred Slot</span>
                </button>
              </form>
              
              <div className="direct-booking-banner">
                <span className="banner-or">OR</span>
                <p className="banner-text">Prefer immediate booking? Book instantly using our scheduler:</p>
                <a 
                  href="https://pappyjoe.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline btn-direct-link"
                >
                  <span>Book Instantly via PappyJoe</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </>
          ) : (
            <div className="success-container animate-fade-in">
              <div className="success-icon-wrapper">
                <CheckCircle size={64} className="success-icon-svg" />
              </div>
              <h2 className="success-title">Appointment Request Sent!</h2>
              <p className="success-desc">
                Thank you, <strong>{formData.name}</strong>. We have received your request for a 
                <strong> {services.find(s => s.value === formData.service)?.label}</strong> consultation on 
                <strong> {formData.date}</strong> during the 
                <strong> {timeSlots.find(t => t.value === formData.timeSlot)?.label}</strong> slot.
              </p>
              
              <div className="success-next-steps">
                <h4>What happens next?</h4>
                <ol className="steps-list">
                  <li>Our clinical coordinator will review your requested slot.</li>
                  <li>We will call you at <strong>{formData.phone}</strong> to confirm the exact timing.</li>
                  <li>A confirmation message with directions will be texted to your phone.</li>
                </ol>
              </div>

              <div className="success-actions">
                <button onClick={handleReset} className="btn btn-outline-gold">
                  <RefreshCw size={16} />
                  <span>Book Another Appointment</span>
                </button>
                <a 
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dental+Consultation+-+Dr.+Aditi&dates=${formData.date.replace(/-/g, '')}T110000Z/${formData.date.replace(/-/g, '')}T120000Z&details=Dental+or+Maxillofacial+consultation+requested+at+Dr.+Aditi's+Clinic&location=Vivek+Khand+2,+Gomti+Nagar,+Lucknow`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                >
                  <span>Add to Google Calendar</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
