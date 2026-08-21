import "../style/home.scss"

const Home = () => {
    return (
        <main className='home'>
            <header className="home-header">
                <h1>Create Your Custom <span>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a<br /> winning strategy.</p>
            </header>

            <section className="interview-input-group" aria-label="Interview plan details">
                <div className='left form-column'>
                    <div className="section-heading">
                        <svg className="heading-icon target-job-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7h3.5A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9A1.5 1.5 0 0 1 5.5 7H9Zm0 2H6v2h12V9h-9Zm3 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" /></svg>
                        <label htmlFor="jobDescription">Target Job Description</label>
                        <span className="required-mark">Required</span>
                    </div>
                    <div className="textarea-wrap job-description-wrap">
                        <textarea name="jobDescription" id="jobDescription" placeholder='write the full job description here...&#10;e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and responsive system design."'></textarea>
                        <span className="character-count">0 / 5000 chars</span>
                    </div>
                </div>

                <div className='right form-column'>
                    <div className='input-group resume-group'>
                        <div className="section-heading">
                            <svg className="heading-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>
                            <span>Your Profile</span>
                        </div>
                        <label className="field-label" htmlFor="resume">Upload Resume <small className="highlight">Required</small></label>
                        <label className="file-label" htmlFor="resume">
                            <svg className="upload-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 18.5h9a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 6.4 9.1a3.75 3.75 0 0 0 1.1 7.4Z" /><path d="m12 15 0-6m0 0-2.5 2.5M12 9l2.5 2.5" /></svg>
                            <strong>Click to upload or drag &amp; drop</strong>
                            <small>PDF or DOCX (Max 5MB)</small>
                        </label>
                        <input hidden type="file" name='resume' id='resume' accept='.pdf,.docx' />
                    </div>

                    <div className="divider"><span>OR</span></div>

                    <div className='input-group self-description-group'>
                        <label className="field-label" htmlFor="selfDescription">Self-Description</label>
                        <textarea name="selfDescription" id="selfDescription" placeholder='Briefly describe your experience, key skills, and areas of expertise (if you don’t have a resume handy).'></textarea>
                    </div>

                    <div className="notice">
                        <svg className="notice-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></svg>
                        <span><strong>Either a Resume or a Self Description</strong> is required to generate a personalized plan.</span>
                    </div>

                    <button className='button primary-button'><svg className="sparkle-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Zm6.5 12 .65 2.35L21.5 18l-2.35.65L18.5 21l-.65-2.35L15.5 18l2.35-.65L18.5 15Z" /></svg>Generate My Interview Strategy</button>
                </div>
            </section>

            <footer className="home-footer">
                <span>AI-Powered with Strategy Generation - Approx. 30s</span>
                <nav aria-label="Footer navigation"><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a><a href="#help">Help Center</a></nav>
            </footer>

        </main>
    )
}

export default Home



