"use client";

import { useState } from "react";
import { FranchisingData } from "@/src/types/franchising";
import {
    franchiseService,
    FranchiseRequest
} from "@/src/services/franchiseService";

interface ApplyFormProps {
  cms?: FranchisingData;
}

const ApplyForm = ({ cms }: ApplyFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // State for floating labels
    const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!fieldValues.firstName?.trim()) {
            errors.name = 'First name is required';
        }
        if (!fieldValues.lastName?.trim()) {
            errors.lastname = 'Last name is required';
        }
        if (!fieldValues.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(fieldValues.email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!fieldValues.phone?.trim()) {
            errors.phone = 'Phone number is required';
        }
        if (!fieldValues.preferredCities?.trim()) {
            errors.required_cities = 'Preferred cities are required';
        }
        if (!fieldValues.availableInvestment?.trim()) {
            errors.available_investment_capital = 'Available investment capital is required';
        }
        if (!fieldValues.investmentTimeFrame?.trim()) {
            errors.investment_time_frame = 'Investment time frame is required';
        }
        if (!fieldValues.currentProfession?.trim()) {
            errors.current_profession = 'Current profession is required';
        }
        if (!fieldValues.yearOfCurrentProfession?.trim()) {
            errors.number_of_years_in_current_profession = 'Years in current profession is required';
        }
        if (!fieldValues.ownedBusiness?.trim()) {
            errors.ever_owned_business_before = 'Please select if you have owned a business before';
        }
        if (!fieldValues.alreadyVisit?.trim()) {
            errors.ever_visited_clucks = 'Please select if you have visited Cluck Clucks';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);

        if (validateForm()) {
            setIsSubmitting(true);

            const franchiseData: FranchiseRequest = {
                name: fieldValues.firstName || '',
                lastname: fieldValues.lastName || '',
                email: fieldValues.email || '',
                phone: fieldValues.phone || '',
                required_cities: fieldValues.preferredCities || '',
                available_investment_capital: fieldValues.availableInvestment || '',
                investment_time_frame: fieldValues.investmentTimeFrame || '',
                current_profession: fieldValues.currentProfession || '',
                number_of_years_in_current_profession: fieldValues.yearOfCurrentProfession || '',
                ever_owned_business_before: (fieldValues.ownedBusiness === 'yes' ? 'Yes' : 'No') as 'Yes' | 'No',
                ever_visited_clucks: (fieldValues.alreadyVisit === 'yes' ? 'Yes' : 'No') as 'Yes' | 'No'
            };

            try {
                const result = await franchiseService.submitFranchiseRequest(franchiseData);

                if (result.success) {
                    setSubmitMessage({ type: 'success', text: result.message });
                    // Reset form
                    setFieldValues({});
                    setErrors({});
                } else {
                    setSubmitMessage({ type: 'error', text: result.message });
                }
            } catch (error) {
                setSubmitMessage({
                    type: 'error',
                    text: 'An unexpected error occurred. Please try again.'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Helper functions for floating labels
    const handleFieldFocus = (fieldName: string) => {
        setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
    };

    const handleFieldBlur = (fieldName: string) => {
        setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
    };

    const handleFieldChange = (fieldName: string, value: string) => {
        setFieldValues(prev => ({ ...prev, [fieldName]: value }));
    };

    const isLabelFloating = (fieldName: string) => {
        return focusedFields[fieldName] || fieldValues[fieldName];
    };

    // Don't render if form is not visible
    if (!cms?.form?.visible) {
        return null;
    }

    return (
        <section className="py-16 overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Outer Border */}
                <div className="border-2 border-[#F15C3E] rounded-3xl overflow-hidden">
                    {/* Inner White Background */}
                    <div className="bg-white rounded-lg p-6 overflow-hidden">
                        {/* Title */}
                        <h2
                            className="text-5xl leading-[1.167] font-[MDNichrome-Black] font-black 
                            text-center uppercase tracking-[3px] text-[#F15B40] mb-[30px] break-words px-4">
                            {cms?.form?.title || "Franchise Information Request"}
                        </h2>

                        <div className="text-center text-black text-lg md:text-xl mb-10 px-4">
                            {cms?.form?.subtitle || "Contact us by providing your information and we will be in touch soon!"}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden">
                            {/* First Name */}
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={`floating-input ${errors.name ? 'border-red-500' : ''}`}
                                    value={fieldValues.firstName || ''}
                                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                    onFocus={() => handleFieldFocus('firstName')}
                                    onBlur={() => handleFieldBlur('firstName')}
                                />
                                <label
                                    htmlFor="firstName"
                                    className={`floating-label ${isLabelFloating('firstName') ? 'float-up' : ''}`}
                                >
                                    First Name
                                </label>
                                {errors.name && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={`floating-input ${errors.lastname ? 'border-red-500' : ''}`}
                                    value={fieldValues.lastName || ''}
                                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                    onFocus={() => handleFieldFocus('lastName')}
                                    onBlur={() => handleFieldBlur('lastName')}
                                />
                                <label
                                    htmlFor="lastName"
                                    className={`floating-label ${isLabelFloating('lastName') ? 'float-up' : ''}`}
                                >
                                    Last Name
                                </label>
                                {errors.lastname && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.lastname}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="floating-input-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`floating-input ${errors.email ? 'border-red-500' : ''}`}
                                    value={fieldValues.email || ''}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    onFocus={() => handleFieldFocus('email')}
                                    onBlur={() => handleFieldBlur('email')}
                                />
                                <label
                                    htmlFor="email"
                                    className={`floating-label ${isLabelFloating('email') ? 'float-up' : ''}`}
                                >
                                    Email
                                </label>
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="floating-input-group">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={`floating-input ${errors.phone ? 'border-red-500' : ''}`}
                                    value={fieldValues.phone || ''}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                    onFocus={() => handleFieldFocus('phone')}
                                    onBlur={() => handleFieldBlur('phone')}
                                />
                                <label
                                    htmlFor="phone"
                                    className={`floating-label ${isLabelFloating('phone') ? 'float-up' : ''}`}
                                >
                                    Phone
                                </label>
                                {errors.phone && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.phone}</span>
                                )}
                            </div>

                            {/* Preferred cities */}
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="preferredCities"
                                    name="preferredCities"
                                    className={`floating-input ${errors.required_cities ? 'border-red-500' : ''}`}
                                    value={fieldValues.preferredCities || ''}
                                    onChange={(e) => handleFieldChange('preferredCities', e.target.value)}
                                    onFocus={() => handleFieldFocus('preferredCities')}
                                    onBlur={() => handleFieldBlur('preferredCities')}
                                />
                                <label
                                    htmlFor="preferredCities"
                                    className={`floating-label ${isLabelFloating('preferredCities') ? 'float-up' : ''}`}
                                >
                                    List Up To 3 Preferred Cities
                                </label>
                                {errors.required_cities && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.required_cities}</span>
                                )}
                            </div>

                            {/* Radio Buttons Section */}
                            <div className="space-y-3">
                                <p className="font-medium text-black">Available Investment Capital (Required)</p>
                                {errors.available_investment_capital && (
                                    <span className="text-red-500 text-sm block">{errors.available_investment_capital}</span>
                                )}
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="availableInvestment"
                                        value="150,000 - $200,000"
                                        className="accent-black"
                                        onChange={(e) => handleFieldChange('availableInvestment', e.target.value)}
                                    />
                                    150,000 - $200,000
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="availableInvestment"
                                        value="$200,000+"
                                        className="accent-black"
                                        onChange={(e) => handleFieldChange('availableInvestment', e.target.value)}
                                    />
                                    $200,000+
                                </label>
                            </div>
                            {/* Radio Buttons Section */}
                            <div className="space-y-3">
                                <p className="font-medium text-black accent-black ">Investment Time Frame (Required)</p>
                                {errors.investment_time_frame && (
                                    <span className="text-red-500 text-sm block">{errors.investment_time_frame}</span>
                                )}
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="investmentTimeFrame"
                                        value="Immediately"
                                        className="accent-black"
                                        onChange={(e) => handleFieldChange('investmentTimeFrame', e.target.value)}
                                    />
                                    Immediately
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="investmentTimeFrame"
                                        value="3-6 Months"
                                        className="accent-black"
                                        onChange={(e) => handleFieldChange('investmentTimeFrame', e.target.value)}
                                    />
                                    3-6 Months
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="investmentTimeFrame"
                                        value="6-12 Months"
                                        className="accent-black"
                                        onChange={(e) => handleFieldChange('investmentTimeFrame', e.target.value)}
                                    />
                                    6-12 Months
                                </label>
                            </div>

                            {/*Current Profession*/}
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="currentProfession"
                                    name="currentProfession"
                                    className={`floating-input ${errors.current_profession ? 'border-red-500' : ''}`}
                                    value={fieldValues.currentProfession || ''}
                                    onChange={(e) => handleFieldChange('currentProfession', e.target.value)}
                                    onFocus={() => handleFieldFocus('currentProfession')}
                                    onBlur={() => handleFieldBlur('currentProfession')}
                                />
                                <label
                                    htmlFor="currentProfession"
                                    className={`floating-label ${isLabelFloating('currentProfession') ? 'float-up' : ''}`}
                                >
                                    Current Profession (Required)
                                </label>
                                {errors.current_profession && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.current_profession}</span>
                                )}
                            </div>

                            {/*# year of Current Profession */}
                            <div className="floating-input-group">
                                <input
                                    type="number"
                                    id="yearOfCurrentProfession"
                                    name="yearOfCurrentProfession"
                                    className={`floating-input ${errors.number_of_years_in_current_profession ? 'border-red-500' : ''}`}
                                    value={fieldValues.yearOfCurrentProfession || ''}
                                    onChange={(e) => handleFieldChange('yearOfCurrentProfession', e.target.value)}
                                    onFocus={() => handleFieldFocus('yearOfCurrentProfession')}
                                    onBlur={() => handleFieldBlur('yearOfCurrentProfession')}
                                />
                                <label
                                    htmlFor="yearOfCurrentProfession"
                                    className={`floating-label ${isLabelFloating('yearOfCurrentProfession') ? 'float-up' : ''}`}
                                >
                                    # of Years In Current Profession
                                </label>
                                {errors.number_of_years_in_current_profession && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.number_of_years_in_current_profession}</span>
                                )}
                            </div>
                            {/* Owned Business*/}
                            <div className="floating-dropdown-group">
                                <select
                                    id="ownedBusiness"
                                    name="ownedBusiness"
                                    className={`floating-dropdown ${errors.ever_owned_business_before ? 'border-red-500' : ''}`}
                                    value={fieldValues.ownedBusiness || ''}
                                    onChange={(e) => handleFieldChange('ownedBusiness', e.target.value)}
                                    onFocus={() => handleFieldFocus('ownedBusiness')}
                                    onBlur={() => handleFieldBlur('ownedBusiness')}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="yes">YES</option>
                                    <option value="no">NO</option>
                                </select>
                                <label
                                    htmlFor="ownedBusiness"
                                    className="floating-dropdown-label"
                                >
                                    Have you Ever Owned a Business Before (Required)
                                </label>
                                {errors.ever_owned_business_before && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.ever_owned_business_before}</span>
                                )}
                            </div>

                            {/* visit Cluck Clucks  */}
                            <div className="floating-dropdown-group">
                                <select
                                    id="alreadyVisit"
                                    name="alreadyVisit"
                                    className={`floating-dropdown ${errors.ever_visited_clucks ? 'border-red-500' : ''}`}
                                    value={fieldValues.alreadyVisit || ''}
                                    onChange={(e) => handleFieldChange('alreadyVisit', e.target.value)}
                                    onFocus={() => handleFieldFocus('alreadyVisit')}
                                    onBlur={() => handleFieldBlur('alreadyVisit')}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="yes">YES</option>
                                    <option value="no">NO</option>
                                </select>
                                <label
                                    htmlFor="alreadyVisit"
                                    className="floating-dropdown-label"
                                >
                                    Have You Ever Visited Cluck Clucks? (Required)
                                </label>
                                {errors.ever_visited_clucks && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.ever_visited_clucks}</span>
                                )}
                            </div>

                            {/* Success/Error Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-lg text-center ${submitMessage.type === 'success'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#FBBF24] hover:bg-[#F59E0B] text-black py-3 px-6 rounded-3xl uppercase tracking-wide shadow-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplyForm