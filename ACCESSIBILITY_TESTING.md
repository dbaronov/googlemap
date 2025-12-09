# Accessibility Testing Guide

This document provides guidelines for testing the Yorkshire and The Humber Interactive Map POC for WCAG AA compliance.

## Automated Testing Tools

### Browser DevTools
1. **Chrome/Edge DevTools**
   - Right-click → Inspect → Lighthouse tab
   - Run accessibility audit
   - Check for issues and warnings

2. **Firefox DevTools**
   - Inspector → Accessibility panel
   - Check for keyboard navigation issues

### Browser Extensions
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: Built into Chrome DevTools

## Manual Testing Checklist

### 1. Keyboard Navigation
- [ ] Tab through all interactive elements in order
- [ ] Shift+Tab moves backward through elements
- [ ] Map controls are reachable via Tab
- [ ] Markers can be selected/activated with keyboard
- [ ] Info window close button is keyboard accessible
- [ ] Focus indicators are visible on all interactive elements
- [ ] No keyboard trap (user can always move away from element)

### 2. Screen Reader Testing

#### Testing with NVDA (Free, Windows)
```
1. Download from: https://www.nvaccess.org/
2. Enable Screen Reader in Settings
3. Navigate map with arrow keys
4. Listen for:
   - Landmark announcements
   - Button/control descriptions
   - Form labels
```

#### Testing with JAWS (Commercial, Windows)
```
1. Virtual PC mode for web
2. Arrow keys to navigate
3. H to jump to headings
4. L to jump to landmarks
```

#### Testing with VoiceOver (Built-in, macOS/iOS)
```
Command+F5 to enable
VO = Control+Option
VO+Space to interact with elements
VO+Right arrow to navigate
```

### 3. Visual Testing

#### Color Contrast
- [ ] Navy blue boundary (#00003F) has good contrast
- [ ] Text in info windows meets WCAG AA (4.5:1 for normal text)
- [ ] Use: https://webaim.org/resources/contrastchecker/

#### Text Readability
- [ ] Text remains readable at 200% zoom
- [ ] Text doesn't require horizontal scrolling at 200% zoom
- [ ] Font sizes are adequate (min 12px)
- [ ] Line height is sufficient (min 1.5x)

#### Focus Indicators
- [ ] All buttons show clear focus outline
- [ ] Focus outline is 2px minimum
- [ ] Focus outline is not the same color as background
- [ ] Focus outline has sufficient contrast

### 4. Motion & Animation
- [ ] Test with `prefers-reduced-motion: reduce`
  - macOS: System Preferences → Accessibility → Display → Reduce motion
  - Windows: Settings → Ease of Access → Display → Show animations
- [ ] Info window animations should respect this preference
- [ ] Transitions should be minimal

### 5. Responsive Design Testing

#### Mobile Devices (480px width)
- [ ] Map fills screen vertically and horizontally
- [ ] Controls are positioned for thumb access
- [ ] Info window text is readable
- [ ] Markers are large enough to tap (min 44x44px)

#### Tablets (768px width)
- [ ] Layout adapts appropriately
- [ ] Controls remain accessible

#### Desktop (1024px+ width)
- [ ] Map displays properly
- [ ] Information is well-organized

### 6. Semantic HTML Testing
```javascript
// Check in browser console
// All buttons should have accessible names
document.querySelectorAll('button').forEach(btn => {
  console.log(btn.textContent || btn.getAttribute('aria-label'));
});

// Check for proper landmarks
console.log(document.querySelectorAll('main, [role="main"]'));
```

### 7. Language & Text Testing
- [ ] Language is set correctly: `<html lang="en">`
- [ ] Text is clear and simple
- [ ] No overly complex sentences
- [ ] Abbreviations are explained on first use

## Test Cases

### Test Case 1: Keyboard-Only Navigation
**Steps:**
1. Unplug mouse or disable trackpad
2. Use Tab to navigate to all controls
3. Use Arrow keys with Info window open
4. Use Enter to activate buttons

**Expected Result:** All functionality accessible via keyboard

### Test Case 2: Screen Reader Usage
**Steps:**
1. Enable screen reader (NVDA, JAWS, or VoiceOver)
2. Navigate map with arrow keys
3. Listen to announcements
4. Interact with markers

**Expected Result:**
- Purpose of map is clear
- All markers are identified by city name
- Info window content is readable
- Close button is announced

### Test Case 3: High Contrast Mode
**Steps:**
1. Enable high contrast mode (OS setting)
2. Verify navy blue boundary is still visible
3. Check text contrast in info windows

**Expected Result:** All content remains visible and readable

### Test Case 4: Zoom Testing
**Steps:**
1. Browser zoom to 200% (Ctrl/Cmd + +)
2. Check horizontal scroll requirement
3. Verify text remains readable
4. Test info window display

**Expected Result:**
- No content is cut off
- No horizontal scroll needed for essential content
- Text is readable

### Test Case 5: Touch Testing (Mobile)
**Steps:**
1. Test on real mobile device or device emulation
2. Tap markers with single finger
3. Use pinch-to-zoom
4. Verify all controls are touchable

**Expected Result:** All interactions work smoothly on touch

### Test Case 6: Reduced Motion Testing
**Steps:**
1. Enable `prefers-reduced-motion: reduce`
2. Interact with map
3. Open/close info windows

**Expected Result:** Animations are minimal or non-existent

## Accessibility Standards Reference

### WCAG 2.1 Level AA (Our Target)
- Perceivable: Content is visible and readable
- Operable: Keyboard accessible, sufficient time
- Understandable: Clear language, predictable
- Robust: Compatible with assistive technologies

### Key Success Criteria Met
- **1.4.3 Contrast (Minimum)**: Navy blue boundary has sufficient contrast
- **2.1.1 Keyboard**: All functionality keyboard accessible
- **2.1.2 No Keyboard Trap**: Users can move away from elements
- **2.4.3 Focus Order**: Logical, intuitive focus order
- **2.4.7 Focus Visible**: Clear focus indicators
- **3.2.4 Consistent Identification**: Controls behave predictably
- **4.1.2 Name, Role, Value**: All controls properly labeled

## Common Issues & Fixes

### Issue: Markers not announced by screen reader
**Fix:** Ensure `title` attribute and `aria-label` are set on markers

### Issue: Info window content not accessible
**Fix:** Use `role="region"` and `aria-label` on info window container

### Issue: Focus invisible
**Fix:** Ensure outline color contrasts with background

### Issue: Map not usable with keyboard only
**Fix:** Implement keyboard event handlers for map interaction

## Performance & Accessibility
- Fast load times improve usability for all users
- Current build: ~296 KiB (acceptable)
- Consider code splitting for larger deployments

## Documentation
- Ensure all features are documented
- Provide user help text for complex interactions
- Include error messages that are clear and actionable

## Testing Tools Summary
| Tool | Cost | Platform | Purpose |
|------|------|----------|---------|
| axe DevTools | Free | Browser | Automated accessibility checking |
| WAVE | Free | Browser | Visual feedback on accessibility |
| Lighthouse | Free | Chrome | Performance & accessibility audit |
| NVDA | Free | Windows | Screen reader testing |
| VoiceOver | Free | macOS/iOS | Screen reader testing |
| Color Contrast Checker | Free | Web | Verify color contrast ratios |

## Regular Testing Schedule
- [ ] Before each release
- [ ] After major component changes
- [ ] When updating dependencies
- [ ] Quarterly comprehensive audit
- [ ] User testing with people with disabilities

## Additional Resources
- https://www.w3.org/WAI/WCAG21/quickref/
- https://webaim.org/
- https://a11yproject.com/
- https://www.digitalgov.gov/resources/accessibility-guide/

## Contact & Support
For accessibility questions or issues:
- Review WCAG 2.1 guidelines
- Test with assistive technologies
- Gather feedback from users with disabilities
