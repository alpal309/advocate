package com.structure.models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name = "trackings")
public class Tracking {
    @Expose
    @Id
    private String id;

    @Expose
    private String label;

    @Expose
    @Column(name = "cue_count")
    private int cueCount;

    @Expose
    @Column(name = "permanent_product")
    private String permanentProduct;

    @Expose
    @Column(name = "duration_in_seconds")
    private int durationInSeconds;

    @Expose
    @Column(name = "accuracy_percentage")
    private double accuracyPercentage;

    @Expose
    @Column(name = "trial_id")
    private String trialId;

    @Expose
    private int enabled, correct, frequency;

    @ManyToOne
    @JoinColumn(name = "trial_id", updatable = false, insertable = false)
    private Trial trial;

    public Tracking(){}

    public Tracking(String id, String trialId, String label) {
        this.id = id;
        this.trialId = trialId;
        this.label = label;
        this.enabled = 1;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getCueCount() {
        return cueCount;
    }

    public void setCueCount(int cueCount) {
        this.cueCount = cueCount;
    }

    public String getPermanentProduct() {
        return permanentProduct;
    }

    public void setPermanentProduct(String permanentProduct) {
        this.permanentProduct = permanentProduct;
    }

    public int getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(int durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }

    public double getAccuracyPercentage() {
        return accuracyPercentage;
    }

    public void setAccuracyPercentage(double accuracyPercentage) {
        this.accuracyPercentage = accuracyPercentage;
    }

    public String getTrialId() {
        return trialId;
    }

    public void setTrialId(String trialId) {
        this.trialId = trialId;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    @Override
    public String toString() {
        return "Tracking{" +
                "id=" + id +
                ", frequency=" + frequency +
                ", cueCount=" + cueCount +
                ", permanentProduct='" + permanentProduct + '\'' +
                ", durationInSeconds=" + durationInSeconds +
                ", accuracyPercentage=" + accuracyPercentage +
                ", trialId=" + trialId +
                ", correct=" + correct +
                ", enabled=" + enabled +
                ", label=" + label +
                '}';
    }
}

